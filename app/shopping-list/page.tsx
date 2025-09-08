"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Item = {
  name: string;
  qty: number | string;
  unit?: string;
  note?: string; // safe if you ever store notes like “finely chopped”
};

const LS_KEY = "shoppingList";

export default function ShoppingListPage() {
  const [items, setItems] = useState<Item[]>([]);

  // load once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) setItems(parsed);
    } catch {
      /* ignore */
    }
  }, []);

  // helpers
  const save = (next: Item[]) => {
    setItems(next);
    localStorage.setItem(LS_KEY, JSON.stringify(next));
  };

  const handleRemove = (idx: number) => {
    const next = items.filter((_, i) => i !== idx);
    save(next);
  };

  const handleClear = () => {
    save([]);
  };

  const copyText = useMemo(() => {
    return items
      .map((it) =>
        [it.qty, it.unit].filter(Boolean).join(" ") +
        (it.qty || it.unit ? " " : "") +
        it.name +
        (it.note ? ` — ${it.note}` : "")
      )
      .join("\n");
  }, [items]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
    } catch {
      // optionally toast
    }
  };

  const handleDownload = () => {
    const blob = new Blob([copyText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "shopping-list.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const hasItems = items.length > 0;

  return (
    <div className="min-h-screen bg-base-100">
      <div className="mx-auto max-w-4xl px-4 py-6 md:py-8">
        {/* Top bar */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="btn btn-sm btn-ghost">
              ← Back
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold">Shopping List</h1>
          </div>

          {/* Toolbar */}
          <div className="join hidden sm:inline-flex">
            <button onClick={handleCopy} className="btn btn-sm join-item">
              Copy
            </button>
            <button onClick={handleDownload} className="btn btn-sm join-item">
              Download .txt
            </button>
            <button
              onClick={handleClear}
              disabled={!hasItems}
              className="btn btn-sm btn-error join-item"
            >
              Clear all
            </button>
          </div>
        </div>

        {/* Mobile toolbar */}
        <div className="sm:hidden mb-4 grid grid-cols-3 gap-2">
          <button onClick={handleCopy} className="btn btn-sm">
            Copy
          </button>
          <button onClick={handleDownload} className="btn btn-sm">
            Download
          </button>
          <button
            onClick={handleClear}
            disabled={!hasItems}
            className="btn btn-sm btn-error"
          >
            Clear
          </button>
        </div>

        {!hasItems ? (
          <div className="alert">
            <span>Your shopping list is empty. Add ingredients from a recipe.</span>
          </div>
        ) : (
          <>
            {/* Table (md+) */}
            <div className="hidden md:block overflow-x-auto rounded-xl border border-base-300 bg-base-200">
              <table className="table table-zebra">
                <thead className="sticky top-0 bg-base-200 z-10">
                  <tr>
                    <th className="w-14 text-center">#</th>
                    <th>Ingredient</th>
                    <th className="w-28 text-right">Qty</th>
                    <th className="w-28">Unit</th>
                    <th className="w-24 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it, i) => (
                    <tr key={`${it.name}-${i}`}>
                      <td className="text-center">{i + 1}</td>
                      <td>
                        <div className="flex flex-col">
                          <span className="font-medium">{it.name}</span>
                          {it.note && (
                            <span className="text-xs opacity-70">{it.note}</span>
                          )}
                        </div>
                      </td>
                      <td className="text-right">{it.qty ?? "-"}</td>
                      <td>{it.unit ?? "-"}</td>
                      <td className="text-center">
                        <button
                          onClick={() => handleRemove(i)}
                          className="btn btn-xs btn-ghost"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-2">
              {items.map((it, i) => (
                <div
                  key={`${it.name}-${i}`}
                  className="card bg-base-200 border border-base-300"
                >
                  <div className="card-body p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold">
                          {i + 1}. {it.name}
                        </div>
                        <div className="text-sm opacity-80">
                          <span className="mr-2">
                            Qty: <span className="font-medium">{it.qty ?? "-"}</span>
                          </span>
                          <span>
                            Unit: <span className="font-medium">{it.unit ?? "-"}</span>
                          </span>
                        </div>
                        {it.note && (
                          <div className="mt-1 text-xs opacity-70">{it.note}</div>
                        )}
                      </div>
                      <button
                        onClick={() => handleRemove(i)}
                        className="btn btn-xs btn-ghost"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
