// components/ReportIssueButton.tsx
"use client";

import { useCallback } from "react";

type Props = { className?: string };

export default function ReportIssueButton({ className = "" }: Props) {
  const openIssue = useCallback(() => {
    try {
      const pageUrl =
        typeof window !== "undefined" ? window.location.href : "";
      const pageTitle =
        typeof document !== "undefined"
          ? document.title.split("|")[0].trim()
          : "Recipe";

      const title = `Recipe issue: ${pageTitle || "Recipe"}`;
      const body = [
        "**What went wrong?**",
        "",
        "**Steps to reproduce**",
        "1. ",
        "2. ",
        "",
        `**Page**: ${pageUrl}`,
        "",
        "_(Attach a screenshot if helpful.)_",
      ].join("\n");

      const repo = "Ayushjhawar8/Flavor-ai";

      const url =
        `https://github.com/${repo}/issues/new` +
        `?title=${encodeURIComponent(title)}` +
        `&body=${encodeURIComponent(body)}` +
        `&labels=${encodeURIComponent("bug")}`;

      window.open(url, "_blank", "noopener,noreferrer");
    } catch {
      /* no-op */
    }
  }, []);

  return (
    <button
      type="button"
      onClick={openIssue}
      aria-label="Report recipe issue"
      // NOTE: `tooltip-bottom` prevents the clipped text at the top edge
      className={`btn btn-ghost btn-circle tooltip tooltip-bottom ${className}`}
      data-tip="Report Issue"
    >
      {/* bug icon */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 7V3m8 4V3" />
        <path d="M3 13h18" />
        <path d="M19 20h-2a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4H5a2 2 0 0 1-2-2v-3a6 6 0 0 1 6-6h6a6 6 0 0 1 6 6v3a2 2 0 0 1-2 2Z" />
      </svg>
    </button>
  );
}
