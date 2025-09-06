"use client";

import { useState, useCallback } from "react";

type Props = {
  textToCopy: string;
  buttonText?: string;
  className?: string;
  ariaLabel?: string;
};

export default function CopyButton({
  textToCopy,
  buttonText = "Copy Ingredients",
  className = "",
  ariaLabel = "Copy ingredients",
}: Props) {
  const [status, setStatus] = useState<"idle" | "ok" | "fail">("idle");

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setStatus("ok");
    } catch {
      setStatus("fail");
    } finally {
      setTimeout(() => setStatus("idle"), 1500);
    }
  }, [textToCopy]);

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        onClick={copy}
        className="btn btn-outline btn-primary btn-sm"
        aria-label={ariaLabel}
      >
        {buttonText}
      </button>

      {status !== "idle" && (
        <span
          role="status"
          className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs px-2 py-1 rounded bg-base-200 shadow border border-base-300 whitespace-nowrap"
        >
          {status === "ok" ? "Ingredients copied!" : "Could not copy."}
        </span>
      )}
    </div>
  );
}
