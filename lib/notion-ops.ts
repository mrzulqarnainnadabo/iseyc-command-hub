import { getNotionClient, normalizeDatabaseId, plainProp } from "./notion-client";

export type OpsKind = "meetings" | "chamber" | "media" | "staff";

export type OpsRecord = {
  id: string;
  title: string;
  status: string;
  detail: string;
  date: string;
};

const ENV_FOR_KIND: Record<OpsKind, string> = {
  meetings: "NOTION_MEETINGS_DATABASE_ID",
  chamber: "NOTION_CHAMBER_DATABASE_ID",
  media: "NOTION_MEDIA_DATABASE_ID",
  staff: "NOTION_STAFF_DATABASE_ID",
};

/** Civic Mandate public DB — never use for internal ops modules. */
const MANDATE_DB_BLOCKLIST = new Set(["19b213d55bfc4ce8a653a05147cbbe2a"]);

export function opsDatabaseId(kind: OpsKind): string {
  return normalizeDatabaseId(process.env[ENV_FOR_KIND[kind]]);
}

export function opsConfigured(kind: OpsKind): boolean {
  return Boolean(process.env.NOTION_TOKEN?.trim() && opsDatabaseId(kind));
}

export function notionTokenPresent(): boolean {
  return Boolean(process.env.NOTION_TOKEN?.trim());
}

export function opsConfigStatus(): Record<OpsKind | "token", boolean> {
  return {
    token: notionTokenPresent(),
    meetings: opsConfigured("meetings"),
    chamber: opsConfigured("chamber"),
    media: opsConfigured("media"),
    staff: opsConfigured("staff"),
  };
}

export async function listOpsRecords(kind: OpsKind): Promise<{
  configured: boolean;
  records: OpsRecord[];
  error?: string;
  hint?: string;
}> {
  if (!process.env.NOTION_TOKEN?.trim()) {
    return {
      configured: false,
      records: [],
      hint: "Set NOTION_TOKEN (same integration secret as Civic Mandate).",
    };
  }

  const database_id = opsDatabaseId(kind);
  if (!database_id) {
    return {
      configured: false,
      records: [],
      hint: `Create a Notion database for ${kind}, share it with your integration, set ${ENV_FOR_KIND[kind]} on Vercel.`,
    };
  }

  if (MANDATE_DB_BLOCKLIST.has(database_id)) {
    return {
      configured: false,
      records: [],
      error:
        "This database ID is the Civic Mandate public DB. Use a separate internal ops database.",
    };
  }

  const notion = getNotionClient();
  if (!notion) {
    return { configured: false, records: [], error: "Notion client unavailable" };
  }

  try {
    const res = await notion.databases.query({
      database_id,
      page_size: 30,
    });

    const records: OpsRecord[] = res.results
      .filter((r) => "properties" in r)
      .map((page) => {
        const props = (
          page as { id: string; properties: Record<string, unknown> }
        ).properties;
        const title =
          plainProp(props.Name) ||
          plainProp(props.Title) ||
          plainProp(props.Meeting) ||
          plainProp(props["Meeting Title"]) ||
          plainProp(props.Subject) ||
          "Untitled";
        const status =
          plainProp(props.Status) ||
          plainProp(props.State) ||
          plainProp(props.Stage) ||
          "—";
        const detail =
          plainProp(props.Summary) ||
          plainProp(props.Notes) ||
          plainProp(props.Description) ||
          plainProp(props.Body) ||
          plainProp(props.Role) ||
          "";
        const date =
          plainProp(props.Date) ||
          plainProp(props["Meeting Date"]) ||
          plainProp(props.Created) ||
          "";
        return {
          id: (page as { id: string }).id,
          title,
          status,
          detail,
          date,
        };
      });

    return { configured: true, records };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Notion query failed";
    return {
      configured: true,
      records: [],
      error: msg,
      hint: "Share the database with your Notion integration (⋯ → Connections).",
    };
  }
}
