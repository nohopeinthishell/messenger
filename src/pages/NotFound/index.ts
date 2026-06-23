import "./style.css";
import template from "./NotFound.hbs?raw";
import Block from "../../framework/Block";

export default class NotFound extends Block {
  public static componentName = "NotFound";

  protected template = template;
}
