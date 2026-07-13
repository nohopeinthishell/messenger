import "./style.css";
import Block, { type BlockOwnProps } from "../../framework/Block";
import template from "./Modal.hbs?raw";

type ModalProps = BlockOwnProps & {
  isOpen: boolean;
  title?: string;
  content?: Block;
};

export default class Modal extends Block<ModalProps> {
  public static componentName = "Modal";

  protected events = {
    click: async (e: Event) => {
      const target = e.target as HTMLElement;

      const close = target.closest("[data-action='modal-close']");
      if (close) {
        this.setProps({
          isOpen: false,
          content: undefined,
        });
      }
    },
  };

  protected componentDidMount() {
    if (!this.props.isOpen) {
      return;
    }

    const content = this.props.content?.element();

    if (content && this.refs.content) {
      this.refs.content.replaceChildren(content);
    }
  }

  protected template = template;
}
