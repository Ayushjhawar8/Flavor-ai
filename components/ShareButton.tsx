"use client";

import { useCallback, useEffect, useState } from "react";
import { ShareIcon } from "@heroicons/react/24/solid";

type Props = {
  title: string;          // recipe name
  className?: string;
  ariaLabel?: string;
};

export default function ShareButton({ title, className = "", ariaLabel }: Props) {
  const [copied, setCopied] = useState(false);
  const [shareSupported, setShareSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      setShareSupported(typeof (navigator as any).share === "function");
    }
  }, []);

  const handleShare = useCallback(async () => {
    if (typeof window === "undefined") return;
    const url = window.location.href;

    try {
      if (shareSupported && (navigator as any).share) {
        await (navigator as any).share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch {/* ignore */}
    }
  }, [shareSupported, title]);

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        onClick={handleShare}
        className="btn btn-outline btn-primary btn-sm gap-2"
        aria-label={ariaLabel ?? "Share recipe"}
      >
        <ShareIcon className="h-5 w-5" />
        Share
      </button>

      {copied && (
        <span
          role="status"
          className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs px-2 py-1 rounded bg-base-200 shadow border border-base-300"
        >
          Link copied!
        </span>
      )}
    </div>
  );
}
