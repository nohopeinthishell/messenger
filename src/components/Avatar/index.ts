import "./style.css";
import template from "./Avatar.hbs?raw";
import Block from "../../framework/Block";

export default class Avatar extends Block {
  public static componentName = "Avatar";

  protected template = template;
}
