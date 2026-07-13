import template from "./FormProfile.hbs?raw";
import type { BlockOwnProps } from "../../framework/Block";
import type { ButtonUIProps } from "../../ui/ButtonUI";
import type { InputUIProps } from "../../ui/InputUI";
import Form from "../Form";
import { userController } from "../../controller/UserController";
import type { UpdatePasswordData, UpdateProfileData } from "../../api/UserAPI";

export type FormProfileProps = BlockOwnProps & {
  formType: "profile" | "password";
  fields: InputUIProps[];
  button: ButtonUIProps;
};

export default class FormProfile extends Form<FormProfileProps> {
  public static componentName = "FormProfile";

  protected getSubmitErrorMessage(): string {
    return this.props.formType === "profile"
      ? "Не удалось сохранить профиль"
      : "Не удалось изменить пароль";
  }

  protected onSubmit(formData: Record<string, string>) {
    if (this.props.formType === "profile") {
      return userController.updateProfile(formData as UpdateProfileData);
    }

    const { oldPassword, newPassword, newPasswordRepeat } = formData;

    if (newPassword !== newPasswordRepeat) {
      throw new Error("Новые пароли не совпадают");
    }

    return userController.updatePassword({
      oldPassword,
      newPassword,
    } as UpdatePasswordData);
  }

  protected template = template;
}
