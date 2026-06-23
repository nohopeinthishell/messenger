import template from "./FormProfile.hbs?raw";
import type { BlockOwnProps } from "../../framework/Block";
import type { ButtonUIProps } from "../../ui/ButtonUI";
import type { InputUIProps } from "../../ui/InputUI";
import Form from "../Form";

export type FormProfileProps = BlockOwnProps & {
  fields: InputUIProps[];
  button: ButtonUIProps;
};

export default class FormProfile extends Form<FormProfileProps> {
  public static componentName = "FormProfile";

  protected template = template;
}
