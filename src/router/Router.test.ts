import { beforeEach, describe, expect, it, vi } from "vitest";
import type Block from "../framework/Block";
import Router from "./Router";
import store from "../store/store";

const createBlockClass = (text = "test") =>
  class MockBlock {
    element() {
      const div = document.createElement("div");
      div.dataset.testid = "page";
      div.textContent = text;
      return div;
    }
  } as unknown as new () => Block;

describe("Router", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
    window.history.pushState({}, "", "/");
    store.setState("user", null);

    (Router as unknown as { __instance: Router | null }).__instance = null;
  });

  it("registers route by pathname", () => {
    const router = new Router("#app");

    router.use("/test", createBlockClass());

    expect(router.getRoute("/test")).toBeDefined();
    expect(router.getRoute("/unknown")).toBeUndefined();
  });

  it("renders route on go", () => {
    const router = new Router("#app");

    router.use("/test", createBlockClass());

    router.go("/test");

    expect(window.location.pathname).toBe("/test");
    expect(document.querySelector("[data-testid='page']")).not.toBeNull();
  });

  it("back", () => {
    const router = new Router("#app");
    const backMock = vi
      .spyOn(window.history, "back")
      .mockImplementation(() => {});

    router.back();

    expect(backMock).toHaveBeenCalledTimes(1);

    backMock.mockRestore();
  });

  it("forward", () => {
    const router = new Router("#app");
    const forwardMock = vi
      .spyOn(window.history, "forward")
      .mockImplementation(() => {});

    router.forward();

    expect(forwardMock).toHaveBeenCalledTimes(1);

    forwardMock.mockRestore();
  });

  it("start", () => {
    const router = new Router("#app");

    router.use("/", createBlockClass("Start page"));

    router.start();

    expect(document.querySelector("[data-testid='page']")?.textContent).toBe(
      "Start page",
    );
  });

  it("route notfound", () => {
    const router = new Router("#app");

    router.use("/404", createBlockClass("Not Found"));

    router.go("/undefind-url");

    expect(document.querySelector("[data-testid='page']")?.textContent).toBe(
      "Not Found",
    );
  });

  it("redirects guest", () => {
    const router = new Router("#app");

    router
      .use(
        "/messenger",
        createBlockClass("Messenger page"),
        undefined,
        "private",
      )
      .use("/", createBlockClass("Auth"));

    router.go("/messenger");

    expect(window.location.pathname).toBe("/");
    expect(document.querySelector("[data-testid='page']")?.textContent).toBe(
      "Auth",
    );
  });

  it("redirects authorized", () => {
    const router = new Router("#app");

    router
      .use("/messenger", createBlockClass("Messenger"))
      .use("/", createBlockClass("Auth"), undefined, "guestOnly");

    store.setState("user", { id: 1 });

    router.go("/");

    expect(window.location.pathname).toBe("/messenger");
    expect(document.querySelector("[data-testid='page']")?.textContent).toBe(
      "Messenger",
    );
  });
});
