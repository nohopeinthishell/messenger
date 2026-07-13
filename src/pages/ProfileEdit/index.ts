import template from "./ProfileEdit.hbs?raw";
import Block, { type BlockOwnProps } from "../../framework/Block";
import type { FormProfileProps } from "../../components/FormProfile";
import type { PlainObject } from "../../utils/utils";
import { connect } from "../../store/store";
import type { UpdateProfileData } from "../../api/UserAPI";
import AvatarUploadForm from "../../components/AvatarUploadForm";

type ProfileProps = BlockOwnProps &
  Pick<FormProfileProps, "fields" | "button"> & {
    isAvatarModalOpen: boolean;
    modalContent?: Block;
    user?: UpdateProfileData;
  };

class ProfileEdit extends Block<ProfileProps> {
  public static componentName = "ProfileEdit";

  protected events = {
    click: async (e: Event) => {
      const target = e.target as HTMLElement;

      const avatar = target.closest("[data-action='avatar-open']");
      if (avatar) {
        this.setProps({
          isAvatarModalOpen: true,
          modalContent: new AvatarUploadForm({
            onSuccess: () => {
              this.setProps({
                isAvatarModalOpen: false,
                modalContent: undefined,
              });
            },
          }),
        });

        return;
      }
    },
  };

  protected template = template;
}

export default connect(ProfileEdit, mapStateToProps);

function mapStateToProps(state: PlainObject): Partial<ProfileProps> {
  const user = state.user as UpdateProfileData | undefined;

  return {
    user,
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
