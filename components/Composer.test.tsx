import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Composer } from "./Composer";

describe("Composer", () => {
  it("submits trimmed text with the controlled mode and clears the prompt", () => {
    const onSend = vi.fn();
    const onPromptChange = vi.fn();
    render(
      <Composer
        prompt="  Build a board deck  "
        onPromptChange={onPromptChange}
        onSend={onSend}
        activeMode="plan"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /plan deck/i }));

    expect(onSend).toHaveBeenCalledWith("Build a board deck", [], "plan");
    expect(onPromptChange).toHaveBeenCalledWith("");
  });

  it("does not submit while disabled", () => {
    const onSend = vi.fn();
    render(
      <Composer
        prompt="Build a deck"
        onPromptChange={vi.fn()}
        onSend={onSend}
        disabled
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /generate/i }));
    expect(onSend).not.toHaveBeenCalled();
  });

  it("reports mode changes to its owner", () => {
    const onModeChange = vi.fn();
    render(
      <Composer
        prompt=""
        onPromptChange={vi.fn()}
        onSend={vi.fn()}
        onModeChange={onModeChange}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /^ask$/i }));
    expect(onModeChange).toHaveBeenCalledWith("ask");
  });
});
