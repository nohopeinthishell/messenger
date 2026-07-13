import "./style.css";

import type { BlockOwnProps } from "../../framework/Block";
import template from "./LinkUI.hbs?raw";
import Block from "../../framework/Block";

export type LinkUIProps = BlockOwnProps & {
  href?: string;
  text?: string;
  class?: string;
  action?: string;
};

export default class LinkUI extends Block<LinkUIProps> {
  public static componentName = "LinkUI";

  protected template = template;
}
