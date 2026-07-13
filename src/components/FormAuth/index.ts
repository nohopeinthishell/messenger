import "./style.css";

import template from "./FormAuth.hbs?raw";
import type { BlockOwnProps } from "../../framework/Block";
import type { ButtonUIProps } from "../../ui/ButtonUI";
import type { InputUIProps } from "../../ui/InputUI";
import type { LinkUIProps } from "../../ui/LinkUI";
import Form from "../Form";
import { authController } from "../../controller/AuthController";
import type { SignInData, SignUpData } from "../../api/AuthAPI";

export type FormAuthProps = BlockOwnProps & {
  formType: "signin" | "signup";
  inputs: InputUIProps[];
  button?: ButtonUIProps;
  links?: LinkUIProps[];
};

export default class FormAuth extends Form<FormAuthProps> {
  public static componentName = "FormAuth";

  protected getSubmitErrorMessage(): string {
    return this.props.formType === "signup"
      ? "Не удалось зарегистрироваться"
      : "Не удалось войти";
  }

  protected onSubmit(formData: Record<string, string>) {
    if (this.props.formType === "signup") {
      const {
        email,
        login,
        first_name,
        second_name,
        phone,
        password,
        password_repeat,
      } = formData;

      if (password !== password_repeat) {
        throw new Error("Пароли не совпадают");
      }

      return authController.signUp({
        email,
        login,
        first_name,
        second_name,
        phone,
        password,
      } as SignUpData);
    }

    return authController.signIn(formData as SignInData);
  }

  protected template = template;
}
