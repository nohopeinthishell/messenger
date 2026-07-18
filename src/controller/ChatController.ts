import store from "../store/store";
import { ChatAPI } from "../api/ChatAPI";
import { formatChatTime, isPlainObject } from "../utils/utils";
import { UserAPI } from "../api/UserAPI";
import ChatSocket from "../services/ChatSocket";
import type { MessageProps } from "../pages/Chat";

type LastMessageType = {
  time: string;
  content: string;
};

type ChatType = {
  id: number;
  title: string;
  avatar: string | null;
  last_message: LastMessageType | null;
  lastMessage?: string;
  time?: string;
  active?: boolean;
  activeClass?: string;
};

type SocketMessage = {
  type: "message";
  content: string;
  time?: string;
  user_id?: number;
};

function isSocketMessage(data: unknown): data is SocketMessage {
  return (
    isPlainObject(data) &&
    data.type === "message" &&
    typeof data.content === "string"
  );
}

function getCurrentUserId(): number | null {
  const user = store.getState().user as { id?: unknown } | null | undefined;

  return typeof user?.id === "number" ? user.id : null;
}

function prepareMessage(message: SocketMessage): MessageProps {
  const isOwn = message.user_id === getCurrentUserId();

  return {
    content: message.content,
    time: message.time ? formatChatTime(message.time) : "",
    own: isOwn,
    ownClass: isOwn ? "chat-message_own" : "",
  };
}

class ChatController {
  private api = new ChatAPI();
  private userApi = new UserAPI();
  private socket: ChatSocket | null = null;

  async getChats() {
    const chats = await this.api.getChats();

    if (chats) {
      const selectedChat = store.getState().selectedChat as
        | ChatType
        | null
        | undefined;

      store.setState(
        "chats",
        (chats as ChatType[]).map((chat: ChatType) => ({
          ...chat,
          lastMessage: chat.last_message?.content ?? "",
          time: chat.last_message?.time
            ? formatChatTime(chat.last_message.time)
            : "",
          active: chat.id === selectedChat?.id,
          activeClass:
            chat.id === selectedChat?.id ? "chat-list__item_active" : "",
        })),
      );
    }
  }

  selectChat(id: number) {
    const chats = store.getState().chats as ChatType[] | undefined;

    if (!chats) {
      return;
    }

    const selectedChat = chats.find((chat) => chat.id === id);

    if (!selectedChat) {
      return;
    }

    this.connectToChat(selectedChat.id);

    store.setState("selectedChat", selectedChat);
    store.setState("messages", []);
    store.setState(
      "chats",
      chats.map((chat) => ({
        ...chat,
        active: chat.id === id,
        activeClass: chat.id === id ? "chat-list__item_active" : "",
      })),
    );
  }

  async createChat(title: string) {
    const resp = (await this.api.createChat(title)) as Pick<ChatType, "id">;

    if (resp?.id) {
      await this.getChats();
    }
  }

  async deleteChat(id: number) {
    await this.api.deleteChat(id);

    store.setState("selectedChat", null);
    store.setState("messages", []);
    await this.getChats();
  }

  async addUserToChat(chatId: number, login: string) {
    const users = (await this.userApi.searchUser(login)) as Array<{
      id: number;
      login: string;
    }>;
    const user = users.find((user) => user.login === login);

    if (!user) {
      throw new Error("Пользователь не найден");
    }

    await this.api.addUserToChat(chatId, user.id);
  }

  async deleteUserFromChat(chatId: number, login: string) {
    const users = (await this.userApi.searchUser(login)) as Array<{
      id: number;
      login: string;
    }>;
    const user = users.find((user) => user.login === login);

    if (!user) {
      throw new Error("Пользователь не найден");
    }

    await this.api.deleteUsersFromChat(chatId, [user.id]);
  }

  onMessage(data: unknown) {
    if (Array.isArray(data)) {
      const currentMessages = store.getState().messages as MessageProps[];

      const newMessages = data
        .filter(isSocketMessage)
        .reverse()
        .map(prepareMessage);

      store.setState("messages", [...newMessages, ...currentMessages]);
      return;
    }

    if (isSocketMessage(data)) {
      const messages =
        (store.getState().messages as MessageProps[] | undefined) ?? [];

      store.setState("messages", [...messages, prepareMessage(data)]);
    }
  }

  async connectToChat(chatId: number) {
    const user = store.getState().user as {
      id: number;
      login: string;
    };
    if (user?.id) {
      const resp = (await this.api.connectChat(chatId)) as { token: string };

      if (resp) {
        this.socket?.close();
        this.socket = new ChatSocket({
          userId: user.id,
          chatId: chatId,
          token: resp.token,
          onMessage: this.onMessage,
        });
        this.socket.connect();
      }
    }
  }

  sendMessage(content: string) {
    const message = content.trim();
    if (message) this.socket?.sendMessage(message);
  }
}

export const chatController = new ChatController();
