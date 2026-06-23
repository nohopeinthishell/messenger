import "./style.css";
import template from "./ServerError.hbs?raw";
import Block from "../../framework/Block";

export default class ServerError extends Block {
  public static componentName = "ServerError";

  protected template = template;
}
