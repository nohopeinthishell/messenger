import "./style.css";
import template from "./Avatar.hbs?raw";
import Block, { type BlockOwnProps } from "../../framework/Block";

type AvatarProps = BlockOwnProps & {
  action?: string;
  class?: string;
  src?: string;
};

const RESOURCES_URL = "https://ya-praktikum.tech/api/v2/resources";

export default class Avatar extends Block<AvatarProps> {
  public static componentName = "Avatar";

  constructor(props: AvatarProps = {}) {
    super({
      ...props,
      src: props.src ? `${RESOURCES_URL}${props.src}` : undefined,
    });
  }

  protected template = template;
}
