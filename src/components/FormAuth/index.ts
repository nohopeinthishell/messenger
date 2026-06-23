import "./style.css";

import template from "./FormAuth.hbs?raw";
import type { BlockOwnProps } from "../../framework/Block";
import type { ButtonUIProps } from "../../ui/ButtonUI";
import type { InputUIProps } from "../../ui/InputUI";
import type { LinkUIProps } from "../../ui/LinkUI";
import Form from "../Form";

export type FormAuthProps = BlockOwnProps & {
  inputs: InputUIProps[];
  button?: ButtonUIProps;
  links?: LinkUIProps[];
};

export default class FormAuth extends Form<FormAuthProps> {
  public static componentName = "FormAuth";

  protected template = template;
}
