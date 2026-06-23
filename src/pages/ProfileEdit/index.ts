import template from "./ProfileEdit.hbs?raw";
import Block, { type BlockOwnProps } from "../../framework/Block";
import type { FormProfileProps } from "../../components/FormProfile";

type ProfileProps = BlockOwnProps & Pick<FormProfileProps, "fields" | "button">;

export default class ProfileEdit extends Block<ProfileProps> {
  public static componentName = "ProfileEdit";

  protected template = template;
}
