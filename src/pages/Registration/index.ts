import "./style.css";

import template from "./Registration.hbs?raw";
import Block, { type BlockOwnProps } from "../../framework/Block";
import type { CardProps } from "../../components/Card";

type RegistrationProps = BlockOwnProps & {
  regCard: CardProps;
};

export default class Registration extends Block<RegistrationProps> {
  protected template = template;
}
