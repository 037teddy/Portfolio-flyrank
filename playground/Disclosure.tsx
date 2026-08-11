"use client";

import { useState, useId } from "react";

type DisclosureProps = {
  summary: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export default function Disclosure({
  summary,
  children,
  defaultOpen = false,
}: DisclosureProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div className="border border-slate-200 rounded-md">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-4 py-3 text-left font-medium text-slate-900 hover:bg-slate-50"
      >
        {summary}
        <span aria-hidden="true" className="text-slate-500">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      <div id={panelId} hidden={!isOpen} className="px-4 py-3 text-slate-600">
        {children}
      </div>
    </div>
  );
}