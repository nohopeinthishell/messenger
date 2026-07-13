import "./style.css";

import template from "./DeleteUserFormChat.hbs?raw";
import type { BlockOwnProps } from "../../framework/Block";
import Form from "../Form";
import { chatController } from "../../controller/ChatController";

type DeleteUserFormChatProps = BlockOwnProps & {
  chatId: number;
  onSuccess?: () => void;
};

export default class DeleteUserFormChat extends Form<DeleteUserFormChatProps> {
  public static componentName = "DeleteUserFormChat";

  protected getSubmitErrorMessage(): string {
    return "Не удалось удалить пользователя";
  }

  protected async onSubmit(formData: Record<string, string>) {
    await chatController.deleteUserFromChat(this.props.chatId, formData.login);
    this.props.onSuccess?.();
  }

  protected template = template;
}
