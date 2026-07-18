import "./style.css";

import template from "./Chat.hbs?raw";
import Block, { type BlockOwnProps } from "../../framework/Block";
import type { FormMessageProps } from "../../components/FormMessage";
import { chatController } from "../../controller/ChatController";
import { connect } from "../../store/store";
import CreateChatForm from "../../components/CreateChatForm";
import DeleteChatForm from "../../components/DeleteChatForm";
import AddUserToChat from "../../components/AddUserToChat";
import DeleteUserFormChat from "../../components/DeleteUserFormChat";
import { handleError } from "../../services/toast";

type ChatPreviewProps = {
  id: number;
  title: string;
  avatar: string | null;
  lastMessage: string;
  time: string;
  active?: boolean;
  activeClass?: string;
};

type SelectedChatProps = {
  id: number;
  title: string;
  avatar: string | null;
};

export type MessageProps = {
  content: string;
  time: string;
  own?: boolean;
  ownClass?: string;
};

type ChatProps = BlockOwnProps & {
  chats: ChatPreviewProps[];
  selectedChat?: SelectedChatProps | null;
  messages: MessageProps[];
  messageForm: FormMessageProps;
  isChatModalOpen?: boolean;
  isChatMenuOpen?: boolean;
  chatMenuClass?: string;
  modalContent?: Block;
};

class Chat extends Block<ChatProps> {
  public static componentName = "Chat";

  private searchQuery = "";

  protected componentDidMount(): void {
    void chatController
      .getChats()
      .catch((error) => handleError(error, "Не удалось загрузить чаты"));
  }

  protected render(): void {
    super.render();

    const searchInput = this.element()?.querySelector<HTMLInputElement>(
      ".chats-page__search",
    );

    if (searchInput) {
      searchInput.value = this.searchQuery;
    }

    this.applyChatSearch();
  }

  protected events = {
    click: async (e: Event) => {
      const target = e.target;

      if (!(target instanceof Element)) {
        return;
      }

      const actionElement = target.closest("[data-action]");
      const action = actionElement?.getAttribute("data-action");

      if (!action) {
        return;
      }

      if (action === "modal-close") {
        this.setProps({
          isChatModalOpen: false,
          modalContent: undefined,
        });
        return;
      }

      if (target.closest(".modal")) {
        return;
      }

      switch (action) {
        case "toggle-chat-menu": {
          this.setProps({
            isChatMenuOpen: !this.props.isChatMenuOpen,
            chatMenuClass: !this.props.isChatMenuOpen ? "chat-menu_open" : "",
          });
          return;
        }
        case "select-chat": {
          if (actionElement?.id) {
            chatController.selectChat(Number(actionElement.id));
          }
          return;
        }
        case "create-chat": {
          this.setProps({
            isChatMenuOpen: false,
            chatMenuClass: "",
            isChatModalOpen: true,
            modalContent: new CreateChatForm({
              onSuccess: () => {
                this.setProps({
                  isChatModalOpen: false,
                  modalContent: undefined,
                });
              },
            }),
          });
          return;
        }
        case "delete-chat": {
          if (!this.props.selectedChat?.id) {
            return;
          }

          this.setProps({
            isChatMenuOpen: false,
            chatMenuClass: "",
            isChatModalOpen: true,
            modalContent: new DeleteChatForm({
              chatId: this.props.selectedChat.id,
              chatTitle: this.props.selectedChat.title,
              onSuccess: () => {
                this.setProps({
                  isChatModalOpen: false,
                  modalContent: undefined,
                });
              },
            }),
          });
          return;
        }
        case "add-user": {
          if (!this.props.selectedChat?.id) {
            return;
          }
          this.setProps({
            isChatMenuOpen: false,
            chatMenuClass: "",
            isChatModalOpen: true,
            modalContent: new AddUserToChat({
              chatId: this.props.selectedChat.id,
              onSuccess: () => {
                this.setProps({
                  isChatModalOpen: false,
                  modalContent: undefined,
                });
              },
            }),
          });
          return;
        }

        case "delete-user": {
          if (!this.props.selectedChat?.id) {
            return;
          }
          this.setProps({
            isChatMenuOpen: false,
            chatMenuClass: "",
            isChatModalOpen: true,
            modalContent: new DeleteUserFormChat({
              chatId: this.props.selectedChat.id,
              onSuccess: () => {
                this.setProps({
                  isChatModalOpen: false,
                  modalContent: undefined,
                });
              },
            }),
          });
          return;
        }
        default:
          return;
      }
    },
    input: (e: Event) => {
      const target = e.target as HTMLInputElement;

      if (target.name !== "search") {
        return;
      }

      this.searchQuery = target.value;
      this.applyChatSearch();
    },
  };

  private applyChatSearch(): void {
    const query = this.searchQuery.trim().toLowerCase();
    const chatItems =
      this.element()?.querySelectorAll<HTMLLIElement>(".chat-list > li") ?? [];

    chatItems.forEach((item) => {
      const title =
        item
          .querySelector<HTMLElement>("[data-chat-title]")
          ?.dataset.chatTitle?.toLowerCase() ?? "";

      item.hidden = Boolean(query) && !title.includes(query);
    });
  }

  protected template = template;
}

export default connect(Chat);
