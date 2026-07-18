import template from "./ProfilePassword.hbs?raw";
import Block, { type BlockOwnProps } from "../../framework/Block";
import type { FormProfileProps } from "../../components/FormProfile";
import type { UpdateProfileData } from "../../api/UserAPI";
import { connect } from "../../store/store";

type ProfileProps = BlockOwnProps &
  Pick<FormProfileProps, "fields" | "button"> & {
    user?: UpdateProfileData;
  };

class ProfilePassword extends Block<ProfileProps> {
  public static componentName = "ProfilePassword";

  protected template = template;
}

export default connect(ProfilePassword);
