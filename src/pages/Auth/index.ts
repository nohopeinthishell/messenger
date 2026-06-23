import "./style.css";

import template from "./Auth.hbs?raw";
import Block, { type BlockOwnProps } from "../../framework/Block";
import type { CardProps } from "../../components/Card";

type AuthProps = BlockOwnProps & {
  authCard: CardProps;
};

export default class Auth extends Block<AuthProps> {
  protected template = template;
}
