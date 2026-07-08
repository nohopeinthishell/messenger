import Route from "./Route";
import type { BlockOwnProps } from "../framework/Block";
import type { RouteBlockConstructor } from "./Route";

export default class Router {
  private static __instance: Router | null = null;

  private routes: Route[] = [];

  private history: History = window.history;

  private _currentRoute: Route | null = null;

  private _rootQuery: string = "";

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;
    Router.__instance = this;
  }

  use<Props extends BlockOwnProps>(
    pathname: string,
    block: RouteBlockConstructor<Props>,
    props?: Props,
  ): this {
    const route = new Route(pathname, () => new block(props), {
      rootQuery: this._rootQuery,
    });

    this.routes.push(route);

    return this;
  }

  start(): void {
    window.onpopstate = () => {
      this._onRoute(window.location.pathname);
    };
    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string): void {
    const route = this.getRoute(pathname) ?? this.getRoute("/404");

    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string): void {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back(): void {
    this.history.back();
  }

  forward(): void {
    this.history.forward();
  }

  getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname));
  }
}
