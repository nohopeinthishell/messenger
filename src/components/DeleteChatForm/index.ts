import "./style.css";

import template from "./DeleteChatForm.hbs?raw";
import type { BlockOwnProps } from "../../framework/Block";
import Form from "../Form";
import { chatController } from "../../controller/ChatController";

type DeleteChatFormProps = BlockOwnProps & {
  chatId: number;
  chatTitle?: string;
  onSuccess?: () => void;
};

export default class DeleteChatForm extends Form<DeleteChatFormProps> {
  public static componentName = "DeleteChatForm";

  protected getSubmitErrorMessage(): string {
    return "Не удалось удалить чат";
  }

  protected async onSubmit() {
    await chatController.deleteChat(this.props.chatId);
    this.props.onSuccess?.();
  }

  protected template = template;
}
