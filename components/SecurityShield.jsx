"use client";

import { useEffect } from "react";

function isTextEntry(target) {
  return (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement ||
    target.isContentEditable
  );
}

export default function SecurityShield() {
  useEffect(() => {
    const preventContextMenu = (event) => {
      event.preventDefault();
    };

    const preventCopy = (event) => {
      event.preventDefault();
    };

    const preventShortcuts = (event) => {
      const key = event.key.toLowerCase();
      const hasModifier = event.ctrlKey || event.metaKey;
      const isDevToolsShortcut =
        key === "f12" ||
        (hasModifier && key === "u") ||
        (hasModifier && key === "s") ||
        (hasModifier && event.shiftKey && ["i", "j", "c"].includes(key));
      const isCopyOrCutOutsideInput =
        hasModifier && ["c", "x"].includes(key) && !isTextEntry(event.target);

      if (isDevToolsShortcut || isCopyOrCutOutsideInput) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    document.addEventListener("contextmenu", preventContextMenu);
    document.addEventListener("copy", preventCopy);
    document.addEventListener("keydown", preventShortcuts);

    return () => {
      document.removeEventListener("contextmenu", preventContextMenu);
      document.removeEventListener("copy", preventCopy);
      document.removeEventListener("keydown", preventShortcuts);
    };
  }, []);

  return null;
}
