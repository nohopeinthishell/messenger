import "./style.css";

import template from "./AddUserToChat.hbs?raw";
import type { BlockOwnProps } from "../../framework/Block";
import Form from "../Form";
import { chatController } from "../../controller/ChatController";

type AddUserToChatProps = BlockOwnProps & {
  chatId: number;
  onSuccess?: () => void;
};

export default class AddUserToChat extends Form<AddUserToChatProps> {
  public static componentName = "AddUserToChat";

  protected getSubmitErrorMessage(): string {
    return "Не удалось добавить пользователя";
  }

  protected async onSubmit(formData: Record<string, string>) {
    await chatController.addUserToChat(this.props.chatId, formData.login);
    this.props.onSuccess?.();
  }

  protected template = template;
}
