import "./style.css";

import type { BlockOwnProps } from "../../framework/Block";
import template from "./ButtonUI.hbs?raw";
import Block from "../../framework/Block";

export type ButtonUIProps = BlockOwnProps & {
  type?: string;
  text?: string;
  class?: string;
  action?: string;
  page?: string;
};

export default class ButtonUI extends Block<ButtonUIProps> {
  public static componentName = "ButtonUI";

  protected template = template;
}
