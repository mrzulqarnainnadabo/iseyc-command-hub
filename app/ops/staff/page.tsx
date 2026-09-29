"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

type Member = {
  id: string;
  name: string;
  role: string;
  unit: string;
  status: string;
};

export default function StaffPage() {
  const [key, setKey] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [notionConfigured, setNotionConfigured] = useState(false);
  const [notionError, setNotionError] = useState<string | null>(null);
  const [hint, setHint] = useState<string | null>(null);

  async function unlock(e: FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/staff", {
        headers: { Authorization: `Bearer ${key.trim()}` },
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Could not unlock");
        setUnlocked(false);
        return;
      }
      setUnlocked(true);
      setMembers(data.members || []);
      setNotionConfigured(Boolean(data.notionConfigured));
      setNotionError(data.error || null);
      setHint(data.hint || null);
    } catch {
      setError("Network error. Try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <Link href="/ops" className="text-sm font-medium text-emerald-800 hover:underline">
        ← Command Brief
      </Link>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">
          Officer access
        </p>
        <h2 className="mt-2 font-serif text-2xl text-slate-950">Staff workspace</h2>
        <p className="mt-2 text-sm text-slate-600">
          Institutional staff key — server-only, same pattern as Mandate operators.
        </p>

        {!unlocked ? (
          <form onSubmit={unlock} className="mt-6 space-y-4">
            <label className="block text-sm font-medium text-slate-800" htmlFor="staff-key">
              Staff key
            </label>
            <input
              id="staff-key"
              type="password"
              autoComplete="current-password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="min-h-[48px] w-full rounded-xl border border-slate-300 px-3 text-base"
              required
            />
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <button
              type="submit"
              disabled={pending}
              className="min-h-[52px] w-full rounded-xl bg-slate-950 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
            >
              {pending ? "Checking…" : "Unlock workspace"}
            </button>
          </form>
        ) : (
          <div className="mt-6 space-y-4">
            <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
              Unlocked. Authorised ISEYC staff only.
            </p>
            <div>
              <h3 className="font-serif text-lg text-slate-950">Staff roster</h3>
              {!notionConfigured ? (
                <p className="mt-2 text-sm text-slate-600">
                  {hint ||
                    "Optional Notion staff roster: reuse NOTION_TOKEN; use a separate Staff Roster database ID."}
                </p>
              ) : notionError ? (
                <p className="mt-2 text-sm text-amber-800">
                  {notionError}
                  {hint ? ` ${hint}` : ""}
                </p>
              ) : members.length === 0 ? (
                <p className="mt-2 text-sm text-slate-600">No roster rows yet.</p>
              ) : (
                <ul className="mt-3 divide-y divide-slate-200 rounded-xl border border-slate-200">
                  {members.map((m) => (
                    <li key={m.id} className="px-4 py-3">
                      <p className="font-medium text-slate-900">{m.name}</p>
                      <p className="text-xs text-slate-500">
                        {m.role} · {m.unit} · {m.status}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
