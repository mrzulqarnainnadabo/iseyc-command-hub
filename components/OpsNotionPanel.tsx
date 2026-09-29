"use client";

import { FormEvent, useState } from "react";

type RecordRow = {
  id: string;
  title: string;
  status: string;
  detail: string;
  date: string;
};

export function OpsNotionPanel({
  kind,
  title,
  description,
}: {
  kind: "meetings" | "chamber" | "media";
  title: string;
  description: string;
}) {
  const [key, setKey] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [configured, setConfigured] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [records, setRecords] = useState<RecordRow[]>([]);

  async function load(e?: FormEvent) {
    e?.preventDefault();
    setPending(true);
    setError(null);
    try {
      const res = await fetch(`/api/ops/records?kind=${kind}`, {
        headers: { Authorization: `Bearer ${key.trim()}` },
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Could not load");
        setUnlocked(false);
        return;
      }
      setUnlocked(true);
      setConfigured(Boolean(data.configured));
      setRecords(data.records || []);
      setError(data.error || null);
      setHint(data.hint || null);
    } catch {
      setError("Network error");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">
        Operating module · Notion
      </p>
      <h2 className="font-serif text-2xl text-slate-950">{title}</h2>
      <p className="text-sm leading-relaxed text-slate-600">{description}</p>

      {!unlocked ? (
        <form onSubmit={load} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-600">
            Unlock with the institutional staff key to load Notion records for this module.
          </p>
          <label className="block text-sm font-medium" htmlFor={`key-${kind}`}>
            Staff key
          </label>
          <input
            id={`key-${kind}`}
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="min-h-[48px] w-full rounded-xl border border-slate-300 px-3"
            required
          />
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <button
            type="submit"
            disabled={pending}
            className="min-h-[48px] w-full rounded-xl bg-slate-950 text-sm font-semibold text-white disabled:opacity-60"
          >
            {pending ? "Loading…" : "Load from Notion"}
          </button>
        </form>
      ) : (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => load()}
              disabled={pending}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium"
            >
              Refresh
            </button>
          </div>
          {!configured ? (
            <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
              {hint || error || "Notion database not connected for this module yet."}
            </p>
          ) : error ? (
            <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
              {error} {hint}
            </p>
          ) : records.length === 0 ? (
            <p className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
              Database connected. No rows yet — add pages in Notion (Name/Title, Status, Notes).
            </p>
          ) : (
            <ul className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white">
              {records.map((r) => (
                <li key={r.id} className="px-4 py-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-medium text-slate-900">{r.title}</p>
                    <span className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
                      {r.status}
                    </span>
                  </div>
                  {r.date ? <p className="text-xs text-slate-400">{r.date}</p> : null}
                  {r.detail ? (
                    <p className="mt-1 text-sm text-slate-600">{r.detail}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
