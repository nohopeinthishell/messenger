import { describe, expect, it } from "vitest";
import InputUI from ".";

describe("InputUI", () => {
  it("renders input props", () => {
    const input = new InputUI({
      label: "Логин",
      type: "text",
      name: "login",
      value: "alex",
      placeholder: "Введите логин",
      autocomplete: "username",
      class: "custom-input",
    });

    const element = input.element();
    const control = element?.querySelector<HTMLInputElement>("input");

    expect(element?.classList.contains("input-ui")).toBe(true);
    expect(element?.classList.contains("custom-input")).toBe(true);
    expect(element?.querySelector(".input-ui__label")?.textContent).toBe(
      "Логин",
    );
    expect(control?.type).toBe("text");
    expect(control?.name).toBe("login");
    expect(control?.value).toBe("alex");
    expect(control?.placeholder).toBe("Введите логин");
    expect(control?.autocomplete).toBe("username");
  });

  it("returns validation data", () => {
    const input = new InputUI({
      name: "login",
      value: "alex",
      error: "Ошибка",
    });

    expect(input.getValidationData()).toEqual({
      name: "login",
      value: "alex",
      error: "Ошибка",
    });
  });
});
