import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChatWidget from "../app/components/ChatWidget";

describe("ChatWidget", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("renders closed by default with a toggle button", () => {
    render(<ChatWidget />);
    expect(
      screen.getByRole("button", { name: /💬/ })
    ).toBeInTheDocument();
  });

  it("opens the chat panel and shows the greeting message", async () => {
    const user = userEvent.setup();
    render(<ChatWidget />);

    await user.click(screen.getByRole("button", { name: /💬/ }));

    expect(
      screen.getByText(/ask me anything about teddy's work/i)
    ).toBeInTheDocument();
  });

  it("shows a pending state while waiting for a response", async () => {
    const user = userEvent.setup();

    (fetch as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(
            () =>
              resolve({
                json: async () => ({ reply: "Teddy builds frontend interfaces." }),
              }),
            50
          );
        })
    );

    render(<ChatWidget />);
    await user.click(screen.getByRole("button", { name: /💬/ }));

    const input = screen.getByPlaceholderText(/type a question/i);
    await user.type(input, "Who is Teddy?");
    await user.click(screen.getByRole("button", { name: /send/i }));

    expect(screen.getByText(/thinking/i)).toBeInTheDocument();
  });

  it("renders the assistant's reply on success", async () => {
    const user = userEvent.setup();

    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      json: async () => ({ reply: "Teddy builds frontend interfaces." }),
    });

    render(<ChatWidget />);
    await user.click(screen.getByRole("button", { name: /💬/ }));

    const input = screen.getByPlaceholderText(/type a question/i);
    await user.type(input, "Who is Teddy?");
    await user.click(screen.getByRole("button", { name: /send/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/teddy builds frontend interfaces/i)
      ).toBeInTheDocument();
    });
  });

  it("shows a fallback error message when the API call fails", async () => {
    const user = userEvent.setup();

    (fetch as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error("Network error")
    );

    render(<ChatWidget />);
    await user.click(screen.getByRole("button", { name: /💬/ }));

    const input = screen.getByPlaceholderText(/type a question/i);
    await user.type(input, "Who is Teddy?");
    await user.click(screen.getByRole("button", { name: /send/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/sorry, something went wrong/i)
      ).toBeInTheDocument();
    });
  });
});