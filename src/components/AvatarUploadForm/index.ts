import "./style.css";
import template from "./AvatarUploadForm.hbs?raw";
import { userController } from "../../controller/UserController";
import Block, { type BlockOwnProps } from "../../framework/Block";

type AvatarUploadFormProps = BlockOwnProps & {
  error?: string;
  fileName?: string;
  isUploadError?: boolean;
};

export default class AvatarUploadForm extends Block<AvatarUploadFormProps> {
  public static componentName = "AvatarUploadForm";

  private selectedFile: File | null = null;

  protected events = {
    change: (event: Event) => {
      const target = event.target as HTMLInputElement;

      if (target.name !== "avatar" || !target.files?.[0]) {
        return;
      }

      this.selectedFile = target.files[0];
      this.setProps({
        error: undefined,
        fileName: this.selectedFile.name,
        isUploadError: false,
      });
    },
    submit: async (event: Event) => {
      event.preventDefault();

      if (!this.selectedFile) {
        this.setProps({
          error: "Нужно выбрать файл",
          isUploadError: false,
        });

        return;
      }

      const formData = new FormData();
      formData.append("avatar", this.selectedFile);

      try {
        await userController.updateAvatar(formData);
      } catch {
        this.selectedFile = null;
        this.setProps({
          error: undefined,
          fileName: undefined,
          isUploadError: true,
        });
      }
    },
  };

  protected template = template;
}
