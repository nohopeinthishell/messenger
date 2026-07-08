import "./style.css";

import template from "./Card.hbs?raw";
import Block, { type BlockOwnProps } from "../../framework/Block";
import type { FormAuthProps } from "../FormAuth";

export type CardProps = BlockOwnProps &
  FormAuthProps & {
    title: string;
    class?: string;
  };

export default class Card extends Block<CardProps> {
  public static componentName = "Card";

  protected template = template;
}
