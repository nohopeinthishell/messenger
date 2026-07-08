import "./style.css";

import template from "./Profile.hbs?raw";
import Block, { type BlockOwnProps } from "../../framework/Block";

type FieldProps = {
  label: string;
  value: string;
};

type ProfileProps = BlockOwnProps & {
  displayName: string;
  fields: Array<FieldProps>;
};

export default class Profile extends Block<ProfileProps> {
  public static componentName = "Profile";

  protected template = template;
}
