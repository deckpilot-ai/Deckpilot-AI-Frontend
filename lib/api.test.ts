import { afterEach, describe, expect, it, vi } from "vitest";

import { api } from "./api";

describe("API client", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("sends authenticated JSON requests with the expected shape", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ status: "ok", service: "deckpilotAI-backend" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(api.getHealth()).resolves.toEqual({
      status: "ok",
      service: "deckpilotAI-backend",
    });
    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:8000/api/v1/health",
      expect.objectContaining({
        credentials: "include",
        headers: expect.any(Headers),
      })
    );
  });

  it("surfaces API details and broadcasts protected-route expiration", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ detail: "Invalid or expired token" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        })
      )
    );
    const unauthorized = vi.fn();
    window.addEventListener("deckpilotai:unauthorized", unauthorized);

    await expect(api.getMe()).rejects.toThrow("Invalid or expired token");
    expect(unauthorized).toHaveBeenCalledOnce();
    window.removeEventListener("deckpilotai:unauthorized", unauthorized);
  });

  it("does not treat an invalid login as expiration of an existing session", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ detail: "Invalid email or password" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        })
      )
    );
    const unauthorized = vi.fn();
    window.addEventListener("deckpilotai:unauthorized", unauthorized);

    await expect(api.login({ email: "nobody@example.com", password: "wrong" })).rejects.toThrow(
      "Invalid email or password"
    );
    expect(unauthorized).not.toHaveBeenCalled();
    window.removeEventListener("deckpilotai:unauthorized", unauthorized);
  });
});
