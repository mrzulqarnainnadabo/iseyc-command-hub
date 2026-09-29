import Link from "next/link";
import { HUB_MODULES } from "@/lib/modules";

export default function CommandBriefPage() {
  const internal = HUB_MODULES.filter((m) => !m.external);
  const civic = HUB_MODULES.filter((m) => m.group === "Civic systems");

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
          This is the Digital Operations Centre home — the product shape you built for ISEYC
          leadership. Civic Mandate holds the public citizen record. This centre holds staff
          navigation, operating modules, and review entry points on a stack that deploys from a
          phone.
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
