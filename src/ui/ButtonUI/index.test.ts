import { describe, expect, it } from "vitest";
import ButtonUI from ".";

describe("ButtonUI", () => {
  it("renders button props", () => {
    const button = new ButtonUI({
      type: "submit",
      text: "Send",
      class: "custom-button",
      action: "send-message",
      page: "/messenger",
    });

    const element = button.element() as HTMLButtonElement | null;

    expect(element?.tagName).toBe("BUTTON");
    expect(element?.textContent?.trim()).toBe("Send");
    expect(element?.type).toBe("submit");
    expect(element?.classList.contains("button-ui")).toBe(true);
    expect(element?.classList.contains("custom-button")).toBe(true);
    expect(element?.dataset.action).toBe("send-message");
    expect(element?.getAttribute("page")).toBe("/messenger");
  });
});
