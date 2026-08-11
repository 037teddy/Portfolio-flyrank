"use client";

import { useState } from "react";
import Modal from "../../playground/Modal";
import Tabs from "../../playground/Tabs";
import Disclosure from "../../playground/Disclosure";

export default function PlaygroundDemo() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-10">
      <section>
        <h2 className="text-xl font-semibold mb-3">Modal</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Open Modal
        </button>
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Example Modal"
        >
          <p>Try tabbing through this. Focus should stay trapped inside.</p>
          <input
            type="text"
            placeholder="Some input"
            className="border border-slate-200 rounded-md px-3 py-2 mt-2 w-full"
          />
        </Modal>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Tabs</h2>
        <Tabs
          tabs={[
            { id: "tab1", label: "Tab One", content: <p>Content for tab one.</p> },
            { id: "tab2", label: "Tab Two", content: <p>Content for tab two.</p> },
            { id: "tab3", label: "Tab Three", content: <p>Content for tab three.</p> },
          ]}
        />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Disclosure</h2>
        <Disclosure summary="What is this component?">
          <p>This is a disclosure widget built from scratch following the ARIA pattern.</p>
        </Disclosure>
      </section>
    </div>
  );
}