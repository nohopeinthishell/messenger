import store from "../store/store";
import { ChatAPI } from "../api/ChatAPI";
import { formatChatTime } from "../utils/utils";
import { UserAPI } from "../api/UserAPI";

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

class ChatController {
  private api = new ChatAPI();
  private userApi = new UserAPI();

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
}

export const chatController = new ChatController();
