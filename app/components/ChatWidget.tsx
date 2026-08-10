"use client";

import { useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! Ask me anything about Teddy's work." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.content }),
      });
      const data = await res.json().catch(() => ({}));
      const reply =
        data.reply ??
        data.detail ??
        data.error ??
        "Sorry, something went wrong.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-3 w-80 h-96 bg-white border border-slate-200 rounded-lg shadow-xl flex flex-col overflow-hidden">
          <div className="bg-blue-700 text-white px-4 py-3 font-medium">
            Ask about Teddy
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm px-3 py-2 rounded-md max-w-[85%] ${
                  m.role === "user"
                    ? "bg-blue-700 text-white ml-auto"
                    : "bg-slate-100 text-slate-900"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="text-sm px-3 py-2 rounded-md bg-slate-100 text-slate-500 max-w-[85%]">
                Thinking...
              </div>
            )}
          </div>
          <div className="border-t border-slate-200 p-2 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a question..."
              className="flex-1 text-sm px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-blue-700"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-700 text-white text-sm px-3 py-2 rounded-md hover:bg-blue-800"
            >
              Send
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-700 text-white rounded-full w-14 h-14 shadow-lg hover:bg-blue-800 flex items-center justify-center text-2xl"
      >
        {open ? "×" : "💬"}
      </button>
    </div>
  );
}