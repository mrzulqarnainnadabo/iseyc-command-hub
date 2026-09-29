/** DOC-shaped module map — links internal routes or external products. */
export type HubModule = {
  id: string;
  label: string;
  group: "Executive" | "Civic systems" | "Operating records" | "Communications" | "Governance";
  href: string;
  external?: boolean;
  blurb: string;
};

export const HUB_MODULES: HubModule[] = [
  {
    id: "command-brief",
    label: "Command Brief",
    group: "Executive",
    href: "/ops",
    blurb: "National President attention surface — civic memory and system status.",
  },
  {
    id: "mandate",
    label: "2027 Civic Mandate",
    group: "Civic systems",
    href: "https://2027-street-mandate.vercel.app",
    external: true,
    blurb: "Citizen demands · Published-only public record · Not a poll.",
  },
  {
    id: "brief-kaduna",
    label: "Kaduna State Brief",
    group: "Civic systems",
    href: "https://2027-street-mandate.vercel.app/brief?state=Kaduna",
    external: true,
    blurb: "Weekly published demands for field and Street Reps.",
  },
  {
    id: "mandate-ops",
    label: "Mandate operators",
    group: "Civic systems",
    href: "https://2027-street-mandate.vercel.app/operators",
    external: true,
    blurb: "Human review for New → Published mandates and blueprints.",
  },
  {
    id: "civic-brain",
    label: "Civic Brain",
    group: "Civic systems",
    href: "https://iseyc-civic-brain.vercel.app",
    external: true,
    blurb: "Institutional intelligence product (separate deploy).",
  },
  {
    id: "chamber",
    label: "Digital Chamber",
    group: "Operating records",
    href: "/ops/chamber",
    blurb: "Session and chamber records — Notion-backed workspace.",
  },
  {
    id: "meetings",
    label: "Meeting & Decisions",
    group: "Operating records",
    href: "/ops/meetings",
    blurb: "Meeting intake and decision register — institutional memory.",
  },
  {
    id: "media",
    label: "Media & Content Command",
    group: "Communications",
    href: "/ops/media",
    blurb: "Draft → human approval → publish discipline.",
  },
  {
    id: "staff",
    label: "Officer access",
    group: "Governance",
    href: "/ops/staff",
    blurb: "Staff roster and access notes.",
  },
];

export const GROUPS: HubModule["group"][] = [
  "Executive",
  "Civic systems",
  "Operating records",
  "Communications",
  "Governance",
];
