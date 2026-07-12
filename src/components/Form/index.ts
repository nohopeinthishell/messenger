import Block, { type BlockOwnProps } from "../../framework/Block";
import { validation } from "../../services/validation";
import InputUI from "../../ui/InputUI";

export default abstract class Form<
  Props extends BlockOwnProps = BlockOwnProps,
> extends Block<Props> {
  protected abstract onSubmit(
    formData: Record<string, string>,
  ): void | Promise<void>;
  protected events = {
    submit: (e: Event) => {
      e.preventDefault();

      const inputs = this.children.filter(
        (child): child is InputUI => child instanceof InputUI,
      );

      const formData = inputs.reduce<Record<string, string>>((acc, input) => {
        const data = input.getValidationData();

        if (!data) return acc;

        const error = validation(data.value ?? "", data.name);

        input.setProps({
          error,
        });

        const isAdd = data ? !error : false;

        if (isAdd) {
          acc[data.name] = data.value ?? "";
        }

        return acc;
      }, {});

      if (inputs.length === Object.values(formData).length) {
        this.onSubmit(formData);
      }
    },
  };
}
