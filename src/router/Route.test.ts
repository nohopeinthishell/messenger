import { beforeEach, describe, expect, it, vi } from "vitest";
import type Block from "../framework/Block";
import Route from "./Route";

const createBlock = (text = "Profile page") => {
  const div = document.createElement("div");
  div.dataset.testid = "page";
  div.textContent = text;

  return {
    element: () => div,
  } as unknown as Block;
};

describe("Route", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
  });

  it("matches route by pathname", () => {
    const route = new Route("/profile", () => createBlock(), {
      rootQuery: "#app",
    });
    expect(route.match("/profile")).toBe(true);
    expect(route.match("/messenger")).toBe(false);
  });

  it("render route", () => {
    const route = new Route("/profile", () => createBlock(), {
      rootQuery: "#app",
    });

    route.render();

    const root = document.querySelector("#app");
    const page = document.querySelector("[data-testid='page']");

    expect(root?.contains(page)).toBe(true);
    expect(page?.textContent).toBe("Profile page");
  });

  it("create blocke only once", () => {
    const createBlockMock = vi.fn(() => createBlock());

    const route = new Route("/profile", createBlockMock, {
      rootQuery: "#app",
    });

    route.render();
    route.render();

    expect(createBlockMock).toHaveBeenCalledTimes(1);
  });

  it("leave page", () => {
    const route = new Route("/profile", createBlock, {
      rootQuery: "#app",
    });
    route.render();

    expect(document.querySelector("[data-testid='page']")).not.toBeNull();

    route.leave();

    expect(document.querySelector("[data-testid='page']")).toBeNull();
  });

  it("renders route when navigate pathname matches", () => {
    const createBlockMock = vi.fn(createBlock);
    const route = new Route("/profile", createBlockMock, {
      rootQuery: "#app",
    });

    route.navigate("/profile");

    expect(createBlockMock).toHaveBeenCalledTimes(1);
    expect(document.querySelector("[data-testid='page']")).not.toBeNull();
  });

  it("does not render route when navigate pathname does not match", () => {
    const createBlockMock = vi.fn(createBlock);

    const route = new Route("/profile", createBlockMock, {
      rootQuery: "#app",
    });

    route.navigate("/messenger");

    expect(createBlockMock).not.toHaveBeenCalled();
    expect(document.querySelector("[data-testid='page']")).toBeNull();
  });
});
