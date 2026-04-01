## 2024-05-18 - [Add keyboard accessibility to interactive div rows]
**Learning:** Custom interactive rows built with `div` instead of `button` require explicit `role="button"`, `tabIndex={0}`, and an `onKeyDown` handler that watches for "Enter" and "Space" to mimic button behavior, alongside `focus-visible` styling for visual feedback to keyboard users.
**Action:** Always check custom interactive elements (like rows or cards that act as buttons) for keyboard support and add the necessary ARIA roles, tabindex, and keydown handlers.
