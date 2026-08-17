"use client";

import { useState, useRef, useCallback } from "react";

type ButtonState = "idle" | "loading" | "success" | "error";

type SendButtonProps = {
  /**
   * Force a specific outcome instead of the random fake async call.
   * Used by the demo page to let reviewers trigger success/error on demand.
   */
  forceOutcome?: "success" | "error" | null;
  label?: string;
};

export default function SendButton({
  forceOutcome = null,
  label = "Send",
}: SendButtonProps) {
  const [state, setState] = useState<ButtonState>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearPendingTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const handleClick = useCallback(() => {
    // Interruptible: clicking again while loading/success/error just
    // restarts the cycle cleanly instead of layering timers.
    clearPendingTimeout();
    setState("loading");

    const fakeDelay = 900 + Math.random() * 900; // 0.9s - 1.8s

    timeoutRef.current = setTimeout(() => {
      const willSucceed =
        forceOutcome === "success"
          ? true
          : forceOutcome === "error"
          ? false
          : Math.random() > 0.2; // 20% failure rate by default

      setState(willSucceed ? "success" : "error");

      timeoutRef.current = setTimeout(() => {
        setState("idle");
      }, 1500);
    }, fakeDelay);
  }, [forceOutcome, clearPendingTimeout]);

  const isLoading = state === "loading";
  const isSuccess = state === "success";
  const isError = state === "error";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      aria-busy={isLoading}
      aria-live="polite"
      className={`
        relative inline-flex items-center justify-center gap-2
        h-11 px-6 rounded-md font-medium text-white
        max-w-[220px] overflow-hidden
        transition-[background-color,transform,max-width] duration-200 ease-in-out
        motion-reduce:transition-none
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        disabled:cursor-not-allowed
        ${isError ? "focus-visible:ring-red-600" : "focus-visible:ring-blue-700"}
        ${
          isSuccess
            ? "bg-emerald-600"
            : isError
            ? "bg-red-600"
            : "bg-blue-700 hover:bg-blue-800 hover:scale-[1.02] active:scale-[0.98] motion-reduce:hover:scale-100"
        }
        ${isError ? "animate-shake motion-reduce:animate-none" : ""}
      `}
    >
      {/* Label */}
      <span
        className={`
          transition-all duration-200 ease-in
          motion-reduce:transition-none
          ${isLoading ? "opacity-0 -translate-y-2 absolute" : "opacity-100 translate-y-0"}
        `}
      >
        {isSuccess ? "Sent" : isError ? "Retry" : label}
      </span>

      {/* Spinner (loading) */}
      <span
        aria-hidden="true"
        className={`
          h-4 w-4 rounded-full border-2 border-white/40 border-t-white
          transition-all duration-200 ease-out delay-100
          motion-reduce:animate-none motion-reduce:transition-none
          ${isLoading ? "opacity-100 scale-100 animate-spin" : "opacity-0 scale-75 absolute"}
        `}
      />

      {/* Checkmark (success) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={`
          h-4 w-4 transition-all duration-300 ease-out
          motion-reduce:transition-none
          ${isSuccess ? "opacity-100 scale-100" : "opacity-0 scale-75 absolute"}
        `}
      >
        <path
          d="M5 13l4 4L19 7"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Screen reader status announcements */}
      <span className="sr-only">
        {isLoading && "Sending"}
        {isSuccess && "Sent successfully"}
        {isError && "Failed to send, retry"}
      </span>
    </button>
  );
}