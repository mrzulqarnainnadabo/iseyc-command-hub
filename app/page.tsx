import Link from "next/link";

export default function GatePage() {
  return (
    <div className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top_left,#ecfdf5,transparent_40%),#f8fafc] p-6">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-[0_30px_80px_-40px_rgba(15,23,42,0.25)]">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
          ISEYC
        </p>
        <h1 className="mt-3 font-serif text-3xl text-slate-950">
          Digital Operations Centre
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Institutional command surface for ISEYC — the DOC product shape you built, on Notion +
          Vercel so it stays deployable from a phone. No Supabase Auth or Postgres pooler.
        </p>
        <div className="mt-7 space-y-3">
          <Link
            href="/ops"
            className="flex min-h-[52px] items-center justify-center rounded-xl bg-slate-950 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Enter operations
          </Link>
          <a
            href="https://2027-street-mandate.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[48px] items-center justify-center rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Public Civic Mandate ↗
          </a>
        </div>
        <p className="mt-6 text-xs text-slate-400">
          Non-Partisan · Youth-Led · Systems-Focused
        </p>
      </div>
    </div>
  );
}
