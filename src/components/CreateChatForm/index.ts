import "./style.css";

import template from "./CreateChatForm.hbs?raw";
import type { BlockOwnProps } from "../../framework/Block";
import Form from "../Form";
import { chatController } from "../../controller/ChatController";

type CreateChatFormProps = BlockOwnProps & {
  onSuccess?: () => void;
};

export default class CreateChatForm extends Form<CreateChatFormProps> {
  public static componentName = "CreateChatForm";

  protected getSubmitErrorMessage(): string {
    return "Не удалось создать чат";
  }

  protected async onSubmit(formData: Record<string, string>) {
    await chatController.createChat(formData.title);
    this.props.onSuccess?.();
  }

  protected template = template;
}
