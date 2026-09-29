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
    } catch {
      setError("Network error. Try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-6">
      <Link href="/" className="text-sm font-medium text-forest-800 hover:underline">
        ← Command Hub
      </Link>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-forest-700">
          ISEYC staff
        </p>
        <h2 className="mt-2 font-serif text-2xl text-slate-950">Staff workspace</h2>
        <p className="mt-2 text-sm text-slate-600">
          Enter the institutional staff key (same idea as Mandate operator key). The key never
          ships in the public JavaScript bundle.
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
              className="min-h-[48px] w-full rounded-xl border border-stone-300 px-3 text-base"
              placeholder="ISEYC staff key"
              required
            />
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <button
              type="submit"
              disabled={pending}
              className="min-h-[52px] w-full rounded-xl bg-forest-800 text-sm font-semibold text-white hover:bg-forest-900 disabled:opacity-60"
            >
              {pending ? "Checking…" : "Unlock workspace"}
            </button>
          </form>
        ) : (
          <div className="mt-6 space-y-4">
            <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
              Unlocked. This surface is for authorised ISEYC staff only.
            </p>

            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">Quick links</p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>
                  <a
                    className="text-forest-800 underline"
                    href="https://2027-street-mandate.vercel.app/operators"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Mandate operators
                  </a>
                </li>
                <li>
                  <a
                    className="text-forest-800 underline"
                    href="https://2027-street-mandate.vercel.app/brief?state=Kaduna"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Kaduna Civic Brief
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-lg text-slate-950">Staff roster</h3>
              {!notionConfigured ? (
                <p className="mt-2 text-sm text-slate-600">
                  Notion staff database not connected yet. Set{" "}
                  <code className="rounded bg-stone-100 px-1">NOTION_TOKEN</code> and{" "}
                  <code className="rounded bg-stone-100 px-1">NOTION_STAFF_DATABASE_ID</code> on
                  Vercel when ready. Hub still works without it.
                </p>
              ) : notionError ? (
                <p className="mt-2 text-sm text-amber-800">{notionError}</p>
              ) : members.length === 0 ? (
                <p className="mt-2 text-sm text-slate-600">
                  Database connected; no rows returned. Add people in Notion (Name, Role, Unit,
                  Status).
                </p>
              ) : (
                <ul className="mt-3 divide-y divide-stone-200 rounded-xl border border-stone-200 bg-white">
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
