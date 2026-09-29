import Link from "next/link";
import { HUB_MODULES } from "@/lib/modules";
import { opsConfigStatus } from "@/lib/notion-ops";

export const dynamic = "force-dynamic";

export default function CommandBriefPage() {
  const internal = HUB_MODULES.filter((m) => !m.external);
  const civic = HUB_MODULES.filter((m) => m.group === "Civic systems");
  const notion = opsConfigStatus();

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-900 bg-slate-950 p-6 text-slate-100 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-300">
          Presidential Command Brief
        </p>
        <h2 className="mt-2 font-serif text-2xl sm:text-3xl">
          Attention for institutional leadership
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300">
          ISEYC Digital Operations Centre on Notion + Vercel. Public civic memory stays on Civic
          Mandate. Internal modules load from Notion databases behind the staff key — not Supabase
          Auth or Postgres.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://2027-street-mandate.vercel.app/brief?state=Kaduna"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center rounded-xl bg-emerald-400 px-4 text-sm font-semibold text-slate-950"
          >
            Kaduna Civic Brief ↗
          </a>
          <a
            href="https://2027-street-mandate.vercel.app/operators"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center rounded-xl border border-slate-600 px-4 text-sm font-semibold text-white hover:bg-slate-900"
          >
            Mandate operators ↗
          </a>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
          Notion connection status
        </p>
        <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          {(
            [
              ["Integration token", notion.token],
              ["Meetings DB", notion.meetings],
              ["Chamber DB", notion.chamber],
              ["Media DB", notion.media],
              ["Staff roster DB", notion.staff],
            ] as const
          ).map(([label, ok]) => (
            <li
              key={label}
              className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2"
            >
              <span className="text-slate-700">{label}</span>
              <span
                className={
                  ok ? "font-semibold text-emerald-700" : "font-medium text-slate-400"
                }
              >
                {ok ? "Connected" : "Not set"}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-slate-500">
          Reuse the same NOTION_TOKEN as Civic Mandate. Each ops module needs its own database ID
          — never the public Mandate database.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
            Civic systems (live)
          </p>
          <ul className="mt-3 space-y-2">
            {civic.map((m) => (
              <li key={m.id}>
                <a
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-emerald-800 hover:underline"
                >
                  {m.label} ↗
                </a>
                <p className="text-xs text-slate-500">{m.blurb}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
            Operations modules
          </p>
          <ul className="mt-3 space-y-2">
            {internal.map((m) => (
              <li key={m.id}>
                <Link href={m.href} className="text-sm font-medium text-slate-900 hover:underline">
                  {m.label}
                </Link>
                <p className="text-xs text-slate-500">{m.blurb}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
