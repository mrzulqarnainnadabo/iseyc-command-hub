import Link from "next/link";
import {
  CIVIC_BRAIN_URL,
  CIVIC_MANDATE_URL,
  MANDATE_BRIEF_KADUNA,
  MANDATE_OPERATORS,
} from "@/lib/links";

const systems = [
  {
    title: "2027 Civic Mandate",
    blurb:
      "Citizens state what public office must deliver. Published records only. Not a poll.",
    href: CIVIC_MANDATE_URL,
    cta: "Open public product",
  },
  {
    title: "Kaduna State Brief",
    blurb: "This week’s published demands for Kaduna — shareable civic memory.",
    href: MANDATE_BRIEF_KADUNA,
    cta: "Open State Brief",
  },
  {
    title: "Mandate operators",
    blurb: "ISEYC review workspace for citizen mandates and blueprints.",
    href: MANDATE_OPERATORS,
    cta: "Open operators",
  },
  {
    title: "Civic Brain",
    blurb: "Institutional intelligence surface (separate product).",
    href: CIVIC_BRAIN_URL,
    cta: "Open Civic Brain",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-forest-700">
          Institutional hub
        </p>
        <h2 className="mt-2 font-serif text-2xl text-slate-950 sm:text-3xl">
          One door into ISEYC systems
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          This Command Hub replaces the heavy Supabase Digital Operations Centre for day-to-day
          staff navigation. Public civic work stays on Civic Mandate. Staff tools use a simple
          key + optional Notion roster — no Postgres pooler, no Auth UUID bootstrap.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/staff"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-forest-800 px-5 text-sm font-semibold text-white hover:bg-forest-900"
          >
            Staff workspace
          </Link>
          <a
            href={CIVIC_MANDATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-stone-300 bg-white px-5 text-sm font-semibold text-slate-800 hover:bg-stone-50"
          >
            Civic Mandate ↗
          </a>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-slate-500">
          Connected systems
        </h3>
        <ul className="space-y-3">
          {systems.map((s) => (
            <li
              key={s.title}
              className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
            >
              <h4 className="font-serif text-lg text-slate-950">{s.title}</h4>
              <p className="mt-1 text-sm text-slate-600">{s.blurb}</p>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex min-h-[44px] items-center text-sm font-semibold text-forest-800 underline-offset-2 hover:underline"
              >
                {s.cta} ↗
              </a>
            </li>
          ))}
        </ul>
      </section>

      <p className="text-xs leading-relaxed text-slate-500">
        Non-partisan. No candidate rankings, polls, or endorsements. Staff pages are not public
        campaign surfaces.
      </p>
    </div>
  );
}
