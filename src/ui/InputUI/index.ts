import "./style.css";

import type { BlockOwnProps } from "../../framework/Block";
import template from "./InputUI.hbs?raw";
import Block from "../../framework/Block";
import { validation } from "../../services/validation";

export type InputUIProps = BlockOwnProps & {
  label?: string;
  type?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  autocomplete?: string;
  error?: string | null;
  class?: string;
};

export default class InputUI extends Block<InputUIProps> {
  public static componentName = "InputUI";

  protected template = template;

  public getValidationData() {
    const input = this.element()?.querySelector("input");

    if (!input?.name) {
      return null;
    }

    return {
      name: input.name,
      value: input.value,
      error: this.props.error ?? "",
    };
  }

  private handleBlur = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const error = validation(input.value, input.name);

    this.setProps({
      error,
      value: input.value,
    });
  };

  protected componentDidMount() {
    const input = this.element()?.querySelector("input");

    input?.addEventListener("blur", this.handleBlur);
  }

  protected componentWillUnmount() {
    const input = this.element()?.querySelector("input");

    input?.removeEventListener("blur", this.handleBlur);
  }
}
