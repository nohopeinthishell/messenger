import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import HTTPTransport from "./HTTPTransport";

describe("HTTPTransport", () => {
  let xhr: MockXMLHttpRequest;

  class MockXMLHttpRequest {
    headers: Record<string, string> = {};
    method = "";
    response: unknown = null;
    url = "";
    requestBody: unknown = null;
    status = 200;
    statusText = "OK";
    responseText = "{}";
    responseType: XMLHttpRequestResponseType = "";
    timeout = 0;
    withCredentials = false;

    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;
    onabort: (() => void) | null = null;
    ontimeout: (() => void) | null = null;

    open(method: string, url: string) {
      this.method = method;
      this.url = url;
    }

    setRequestHeader(key: string, value: string) {
      this.headers[key] = value;
    }

    getResponseHeader() {
      return "application/json";
    }

    send = vi.fn((body?: unknown) => {
      this.requestBody = body;
    });
  }

  beforeEach(() => {
    xhr = new MockXMLHttpRequest();

    vi.stubGlobal(
      "XMLHttpRequest",
      vi.fn(function XMLHttpRequestMock() {
        return xhr;
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("sends GET request", () => {
    const http = new HTTPTransport();

    http.get("/api/user");

    expect(xhr.method).toBe("GET");
    expect(xhr.url).toBe("/api/user");
    expect(xhr.withCredentials).toBe(true);
    expect(xhr.requestBody).toBeUndefined();
  });

  it("sends GET request with query", () => {
    const http = new HTTPTransport();

    http.get("/api/user", { data: { test: "test" } });

    expect(xhr.method).toBe("GET");
    expect(xhr.url).toBe("/api/user?test=test");
    expect(xhr.withCredentials).toBe(true);
    expect(xhr.requestBody).toBeUndefined();
  });

  it("sends POST request", () => {
    const http = new HTTPTransport();

    http.post("/api/user", { data: { test: "test" } });

    expect(xhr.method).toBe("POST");
    expect(xhr.url).toBe("/api/user");
    expect(xhr.withCredentials).toBe(true);
    expect(xhr.requestBody).toBe(
      JSON.stringify({
        test: "test",
      }),
    );
    expect(xhr.headers["Content-Type"]).toBe("application/json");
  });

  it("sends PUT request", () => {
    const http = new HTTPTransport();

    http.put("/api/user/1", {
      data: {
        name: "Alex",
      },
    });

    expect(xhr.method).toBe("PUT");
    expect(xhr.url).toBe("/api/user/1");
    expect(xhr.requestBody).toBe(
      JSON.stringify({
        name: "Alex",
      }),
    );
    expect(xhr.headers["Content-Type"]).toBe("application/json");
  });

  it("sends DELETE request", () => {
    const http = new HTTPTransport();

    http.delete("/api/user/1");

    expect(xhr.method).toBe("DELETE");
    expect(xhr.url).toBe("/api/user/1");
    expect(xhr.requestBody).toBeUndefined();
  });

  it("sends PUT request with FormData", async () => {
    const http = new HTTPTransport();
    const formData = new FormData();
    const promise = http.put("/path", { data: formData });

    xhr.status = 200;
    xhr.responseText = "{}";
    xhr.onload?.();

    await promise;
    expect(xhr.send).toHaveBeenCalledWith(formData);
  });

  it("returns success JSON response", async () => {
    const http = new HTTPTransport();

    const promise = http.get("/api/user");

    xhr.status = 200;
    xhr.responseText = JSON.stringify({
      id: 1,
      name: "Alex",
    });

    xhr.onload?.();

    await expect(promise).resolves.toEqual({
      id: 1,
      name: "Alex",
    });
  });

  it("rejects response with unsuccessful status", async () => {
    const http = new HTTPTransport();

    const promise = http.get("/api/user");

    xhr.status = 404;
    xhr.statusText = "Not Found";
    xhr.responseText = JSON.stringify({
      id: 1,
      name: "Alex",
    });

    xhr.onload?.();

    await expect(promise).rejects.toMatchObject({
      status: 404,
      statusText: "Not Found",
      response: JSON.stringify({
        id: 1,
        name: "Alex",
      }),
    });
  });

  it("rejects on network error", async () => {
    const http = new HTTPTransport();

    const promise = http.get("/api/user");

    xhr.onerror?.();

    await expect(promise).rejects.toMatchObject({
      reason: "Network error",
    });
  });

  it("rejects on timeout", async () => {
    const http = new HTTPTransport();

    const promise = http.get("/api/user");

    xhr.ontimeout?.();

    await expect(promise).rejects.toMatchObject({
      reason: "Request timeout",
      timeout: 5000,
    });
  });

  it("rejects on abort", async () => {
    const http = new HTTPTransport();

    const promise = http.get("/api/user");

    xhr.onabort?.();

    await expect(promise).rejects.toMatchObject({
      reason: "Request aborted",
    });
  });
});
