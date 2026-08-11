# NOTES.md — Hand-built components vs. shadcn/ui

## Setup

Built three components from scratch in `playground/` (Modal, Tabs, Disclosure),
following the W3C ARIA Authoring Practices Guide patterns for each. Tested all
three keyboard-only (Tab, Shift+Tab, Escape, Arrow keys, Home/End).

Then ran `npx shadcn@latest init`, added `dialog` and `tabs`, and read the
generated source in `components/ui/dialog.tsx` and `components/ui/tabs.tsx`
to compare against my own implementations.

## Dialog — gaps found

1. **Background content isn't hidden from assistive tech.** shadcn's dialog
   is built on Base UI's `Dialog` primitive, which automatically applies
   `aria-hidden`/`inert` to everything outside the dialog while it's open.
   My modal traps *keyboard* focus correctly, but a screen reader user
   browsing by swipe/virtual cursor (not Tab) could still reach the page
   content behind the open modal. Keyboard-only testing did not catch this
   — it only surfaces under screen-reader testing.

2. **No portal rendering.** shadcn renders `DialogContent` into a
   `DialogPortal`, mounting it at the end of `document.body` rather than
   inline in the component tree. My modal renders inline, which works in
   isolation but can be visually clipped or trapped by a parent element
   with `overflow: hidden` or a conflicting `z-index` stacking context in
   a larger app.

3. **No scroll lock.** shadcn's dialog (via Base UI) locks body scroll
   while open. My modal does not — the page behind it can still be
   scrolled with a mouse wheel or touch while the modal is open, which
   breaks the "modal" mental model even though focus itself is trapped.

4. **No description slot.** shadcn has a `DialogDescription` component
   wired to `aria-describedby` on the dialog root, for longer supporting
   text beyond the title. My modal only wires `aria-labelledby` for the
   title — if a longer description were added inside `children`, it
   would not be programmatically associated with the dialog for screen
   reader users.

## Tabs — gaps found

1. **No vertical orientation support.** shadcn's `Tabs` accepts an
   `orientation` prop and adjusts layout *and* keyboard behavior — per
   the ARIA APG pattern, vertical tabs should use ArrowUp/ArrowDown
   instead of ArrowLeft/ArrowRight. My implementation hardcodes
   horizontal-only arrow handling, so it would behave incorrectly if
   reused in a vertical layout.

2. **No disabled-tab handling.** shadcn's trigger supports a disabled
   state (`aria-disabled`, `disabled:pointer-events-none`) that is
   presumably also excluded from arrow-key traversal. My version has no
   concept of a disabled tab — enabling one later would require
   retrofitting both the visual state and the arrow-key skip logic.

3. **Explicit focus-visible styling, separated from hover/active.**
   shadcn deliberately styles `focus-visible` differently from `hover`
   and `data-active`, guaranteeing a visible, high-contrast focus
   indicator regardless of the color theme. My tabs rely on the browser's
   default focus ring, which is functional but not verified against this
   project's specific palette.

4. **Headless primitive vs. hand-rolled logic.** shadcn's tab behavior
   (roving tabindex, active state, keyboard handling) is delegated to
   Base UI's tested `Tabs` primitive. I reimplemented the same
   roving-tabindex logic by hand, which produces the same outcome but
   means that correctness has to be independently maintained and
   re-verified per project, rather than inherited from a shared,
   audited library.

## Takeaway

Writing these by hand first made the ARIA patterns concrete — I know
exactly why each `role`, `aria-*` attribute, and keyboard handler exists
because I had to reason through the APG pattern to add it. Comparing
against shadcn afterward surfaced gaps that keyboard-only testing alone
would not have caught: screen-reader-specific behavior (background
inerting, description association) and edge cases (vertical tabs,
disabled tabs) that only come up once a component is reused outside its
original context.