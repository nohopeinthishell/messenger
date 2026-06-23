import template from "./ProfilePassword.hbs?raw";
import Block, { type BlockOwnProps } from "../../framework/Block";
import type { FormProfileProps } from "../../components/FormProfile";

type ProfileProps = BlockOwnProps & Pick<FormProfileProps, "fields" | "button">;

export default class ProfilePassword extends Block<ProfileProps> {
  public static componentName = "ProfilePassword";

  protected template = template;
}
