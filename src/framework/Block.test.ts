import { describe, expect, it, vi } from "vitest";
import Block, { type BlockOwnProps } from "./Block";

type TestBlockProps = BlockOwnProps & {
  text: string;
};

class TestBlock extends Block<TestBlockProps> {
  protected template = `<button>{{text}}</button>`;

  protected events = {
    click: vi.fn(),
  };

  public getClickHandler() {
    return this.events.click;
  }
}

describe("Block", () => {
  it("renders element from template", () => {
    const block = new TestBlock({ text: "Click" });

    const element = block.element();

    expect(element?.tagName).toBe("BUTTON");
    expect(element?.textContent).toBe("Click");
  });

  it("set props to block", () => {
    const block = new TestBlock({ text: "Old" });

    expect(block.element()?.textContent).toBe("Old");

    block.setProps({ text: "New" });

    expect(block.element()?.textContent).toBe("New");
  });

  it("attaches DOM events", () => {
    const block = new TestBlock();
    const element = block.element();

    element?.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(block.getClickHandler()).toHaveBeenCalledTimes(1);
  });
});
