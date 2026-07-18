import "./style.css";

import Block, { type BlockOwnProps } from "../../framework/Block";
import { connect } from "../../store/store";
import { removeToast, type Toast } from "../../services/toast";
import template from "./ToastContainer.hbs?raw";

type ToastContainerProps = BlockOwnProps & {
  toasts?: Toast[];
};

class ToastContainer extends Block<ToastContainerProps> {
  public static componentName = "ToastContainer";

  protected events = {
    click: (event: Event) => {
      const target = event.target as HTMLElement;
      const closeButton = target.closest("[data-toast-id]");
      const toastId = closeButton?.getAttribute("data-toast-id");

      if (!toastId) {
        return;
      }

      removeToast(Number(toastId));
    },
  };

  protected template = template;
}

export default connect(ToastContainer, (state) => ({
  toasts: (state.toasts as Toast[] | undefined) ?? [],
}));
