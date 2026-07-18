import type Block from "../framework/Block";
import type { BlockOwnProps } from "../framework/Block";

export type RouteBlockConstructor<
  Props extends BlockOwnProps = BlockOwnProps,
> = new (props?: Props) => Block<Props>;

type RouteOptions = {
  rootQuery: string;
};

function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}

function render(query: string, block: Block): Element {
  const root = document.querySelector(query);

  if (!root) {
    throw new Error(`Root element "${query}" not found`);
  }

  const content = block.element();

  if (!content) {
    throw new Error("Block content is not created");
  }

  root.replaceChildren(content);

  return root;
}

export default class Route {
  private _block: Block | null;

  private readonly _createBlock: () => Block;

  private _pathname: string;

  private readonly _rootQuery: string;

  constructor(pathname: string, createBlock: () => Block, options: RouteOptions) {
    this._pathname = pathname;
    this._block = null;
    this._createBlock = createBlock;
    this._rootQuery = options.rootQuery;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave(): void {
    this._block?.element()?.remove();
  }

  match(pathname: string): boolean {
    return isEqual(pathname, this._pathname);
  }

  render(): void {
    if (!this._block) {
      this._block = this._createBlock();
    }

    render(this._rootQuery, this._block);
  }
}
