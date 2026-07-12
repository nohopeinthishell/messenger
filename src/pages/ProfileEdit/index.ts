import template from "./ProfileEdit.hbs?raw";
import Block, { type BlockOwnProps } from "../../framework/Block";
import type { FormProfileProps } from "../../components/FormProfile";
import type { PlainObject } from "../../utils/utils";
import { connect } from "../../store/store";
import type { UpdateProfileData } from "../../api/UserAPI";

type ProfileProps = BlockOwnProps & Pick<FormProfileProps, "fields" | "button">;

class ProfileEdit extends Block<ProfileProps> {
  public static componentName = "ProfileEdit";

  protected template = template;
}

export default connect(ProfileEdit, mapStateToProps);

function mapStateToProps(state: PlainObject): Partial<ProfileProps> {
  const user = state.user as UpdateProfileData | undefined;

  console.log(user);

  return {
    fields: [
      {
        label: "Почта",
        name: "email",
        type: "email",
        value: user?.email ?? "",
      },
      {
        label: "Логин",
        name: "login",
        type: "text",
        value: user?.login ?? "",
      },
      {
        label: "Имя",
        name: "first_name",
        type: "text",
        value: user?.first_name ?? "",
      },
      {
        label: "Фамилия",
        name: "second_name",
        type: "text",
        value: user?.second_name ?? "",
      },
      {
        label: "Имя в чате",
        name: "display_name",
        type: "text",
        value: user?.display_name ?? "",
      },
      {
        label: "Телефон",
        name: "phone",
        type: "tel",
        value: user?.phone ?? "",
      },
    ],
    button: {
      text: "Сохранить",
      type: "submit",
      class: "profile__save-button",
    },
  };
}
