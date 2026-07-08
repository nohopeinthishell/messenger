import Handlebars from "handlebars";
import type { HelperOptions } from "handlebars";
import type Block from "./Block";

let uniqueId = 0;

type ComponentClass = {
  new (props?: never): Block;
  componentName: string;
};

function registerComponent(Component: ComponentClass) {
  Handlebars.registerHelper(
    Component.componentName,
    function (this: unknown, { hash, data }: HelperOptions) {
      const component = new Component(hash as never);
      const componentId = ++uniqueId;
      const dataAttribute = `data-component-hbs-id="${componentId}"`;

      if ("ref" in hash) {
        (data.root.__refs = data.root.__refs || {})[hash.ref] =
          component.element();
      }

      (data.root.__children = data.root.__children || []).push({
        component,
        embed(node: DocumentFragment) {
          const placeholder = node.querySelector(`[${dataAttribute}]`);
          if (!placeholder) {
            throw new Error(
              `Can't find data-id for component ${Component.componentName}`,
            );
          }

          const element = component.element();
          if (!element) {
            throw new Error("Component element is not created");
          }

          placeholder.replaceWith(element);
        },
      });

      return `<div ${dataAttribute}></div>`;
    },
  );
}

export { registerComponent };
