"use client";

type Props = { className?: string };

export default function PrintButton({ className = "" }: Props) {
  const handlePrint = () => {
    try {
      window.print();
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      onClick={handlePrint}
      className={`btn btn-outline btn-primary btn-sm ${className}`}
      aria-label="Print recipe"
    >
      Print
    </button>
  );
}
