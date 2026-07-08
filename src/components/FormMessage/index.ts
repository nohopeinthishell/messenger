import template from "./FormMessage.hbs?raw";
import type { BlockOwnProps } from "../../framework/Block";
import type { InputUIProps } from "../../ui/InputUI";
import Form from "../Form";

type FormMessageButtonProps = {
  text: string;
  type: string;
  action?: string;
  page?: string;
  class?: string;
  ariaLabel?: string;
};

export type FormMessageProps = BlockOwnProps & {
  input: InputUIProps;
  button: FormMessageButtonProps;
};

export default class FormMessage extends Form<FormMessageProps> {
  public static componentName = "FormMessage";

  protected template = template;
}
