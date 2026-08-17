"use client";

import { useState } from "react";
import SendButton from "../../playground/SendButton";

export default function SendButtonDemo() {
  const [mode, setMode] = useState<"random" | "success" | "error">("random");

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-10">
      <section>
        <h1 className="text-2xl font-semibold mb-2">Send Button — State Lifecycle Demo</h1>
        <p className="text-slate-600 mb-6">
          Click the button below to trigger the full idle → loading →
          success/error → idle cycle. Use the mode toggles to force a
          specific outcome, or leave it on Random for the default 20%
          failure rate.
        </p>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setMode("random")}
            className={`text-sm px-3 py-1.5 rounded-md border ${
              mode === "random"
                ? "bg-slate-900 text-white border-slate-900"
                : "border-slate-300 text-slate-600"
            }`}
          >
            Random (20% fail)
          </button>
          <button
            onClick={() => setMode("success")}
            className={`text-sm px-3 py-1.5 rounded-md border ${
              mode === "success"
                ? "bg-emerald-600 text-white border-emerald-600"
                : "border-slate-300 text-slate-600"
            }`}
          >
            Force Success
          </button>
          <button
            onClick={() => setMode("error")}
            className={`text-sm px-3 py-1.5 rounded-md border ${
              mode === "error"
                ? "bg-red-600 text-white border-red-600"
                : "border-slate-300 text-slate-600"
            }`}
          >
            Force Error
          </button>
        </div>

        <SendButton
          key={mode}
          forceOutcome={mode === "random" ? null : mode}
          label="Send message"
        />
      </section>

      <section className="border-t border-slate-200 pt-8">
        <h2 className="text-lg font-semibold mb-3">Design notes</h2>
        <div className="text-sm text-slate-600 space-y-2 leading-relaxed">
          <p>
            <strong>Idle → hover:</strong> a small scale bump (1 → 1.02) and
            background darken over 150–200ms ease-out — fast, since hover is
            a continuous, low-stakes state that shouldn&apos;t feel effortful.
          </p>
          <p>
            <strong>Idle/hover → loading:</strong> the label fades and
            slides up out of view while the spinner fades and scales in
            with a slight delay, so the two never visually overlap or
            collide mid-transition.
          </p>
          <p>
            <strong>Loading → success:</strong> the spinner is replaced by a
            checkmark with a longer, settled ease-out (300ms) — success is a
            moment worth noticing, so it gets slightly more weight than the
            faster hover/loading transitions.
          </p>
          <p>
            <strong>Loading → error:</strong> the background shifts to red
            immediately (color carries the actual state change) alongside a
            single 400ms shake. The shake is decorative — it&apos;s fully
            removed under <code>prefers-reduced-motion</code>, but the color
            change and &quot;Retry&quot; label always remain, since those
            are the real feedback, not the motion.
          </p>
          <p>
            <strong>Success/error → idle:</strong> holds for 1.5s so the
            outcome is actually readable, then fades back over 200ms.
          </p>
          <p>
            All transitions animate only <code>transform</code> and{" "}
            <code>opacity</code> (plus a<code> max-width</code> transition
            for the button&apos;s width change) — nothing that triggers
            layout thrash. Clicking again mid-cycle clears the pending
            timer and restarts cleanly, so spam-clicking never leaves the
            button in a broken or overlapping state.
          </p>
        </div>
      </section>
    </div>
  );
}