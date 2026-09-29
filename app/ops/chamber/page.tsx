import Link from "next/link";

export default function Page() {
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">
        Operating module
      </p>
      <h2 className="font-serif text-2xl text-slate-950">Digital Chamber</h2>
      <p className="text-sm leading-relaxed text-slate-600">
        Session records and chamber workflow. Connect a Notion database when you are ready.
      </p>
      <p className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
        Part of the DOC-shaped operations centre. Next: Notion database + staff-key write path —
        same pattern as Civic Mandate, without Supabase.
      </p>
      <Link href="/ops" className="inline-block text-sm font-semibold text-emerald-800 hover:underline">
        ← Command Brief
      </Link>
    </div>
  );
}
