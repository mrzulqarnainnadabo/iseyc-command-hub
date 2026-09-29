import { Client } from "@notionhq/client";

export type StaffMember = {
  id: string;
  name: string;
  role: string;
  unit: string;
  status: string;
};

/**
 * Staff roster only. Do NOT use the Civic Mandate database ID here.
 * Reuse NOTION_TOKEN from Mandate; use a separate staff database.
 */
function staffDatabaseId(): string {
  return (process.env.NOTION_STAFF_DATABASE_ID || "").replace(/-/g, "").trim();
}

function plain(prop: unknown): string {
  if (!prop || typeof prop !== "object") return "";
  const p = prop as Record<string, unknown>;
  if (p.type === "title" && Array.isArray(p.title)) {
    return (p.title as { plain_text?: string }[])
      .map((t) => t.plain_text || "")
      .join("")
      .trim();
  }
  if (p.type === "rich_text" && Array.isArray(p.rich_text)) {
    return (p.rich_text as { plain_text?: string }[])
      .map((t) => t.plain_text || "")
      .join("")
      .trim();
  }
  if (p.type === "select" && p.select && typeof p.select === "object") {
    return String((p.select as { name?: string }).name || "");
  }
  if (p.type === "status" && p.status && typeof p.status === "object") {
    return String((p.status as { name?: string }).name || "");
  }
  return "";
}

/** Known Civic Mandate DB id — never treat as staff roster. */
const MANDATE_DB_BLOCKLIST = new Set([
  "19b213d55bfc4ce8a653a05147cbbe2a",
]);

export async function listStaffMembers(): Promise<{
  configured: boolean;
  members: StaffMember[];
  error?: string;
  hint?: string;
}> {
  if (!process.env.NOTION_TOKEN?.trim()) {
    return {
      configured: false,
      members: [],
      hint: "Optional: set NOTION_TOKEN (same integration as Civic Mandate is fine).",
    };
  }

  const database_id = staffDatabaseId();
  if (!database_id) {
    return {
      configured: false,
      members: [],
      hint: "Token is enough for later. Create a Staff Roster database and set NOTION_STAFF_DATABASE_ID — do not use the Civic Mandate database ID.",
    };
  }

  if (MANDATE_DB_BLOCKLIST.has(database_id)) {
    return {
      configured: false,
      members: [],
      error:
        "NOTION_STAFF_DATABASE_ID points at the Civic Mandate database. Use a separate Staff Roster database (Name, Role, Unit, Status).",
    };
  }

  const notion = new Client({ auth: process.env.NOTION_TOKEN });

  try {
    const res = await notion.databases.query({
      database_id,
      page_size: 50,
    });

    const members: StaffMember[] = res.results
      .filter((r) => "properties" in r)
      .map((page) => {
        const props = (
          page as { id: string; properties: Record<string, unknown> }
        ).properties;
        const name =
          plain(props.Name) ||
          plain(props.Title) ||
          plain(props.name) ||
          "Unnamed";
        const role = plain(props.Role) || plain(props.role) || "—";
        const unit =
          plain(props.Unit) ||
          plain(props.Department) ||
          plain(props.unit) ||
          "—";
        const status = plain(props.Status) || plain(props.status) || "Active";
        return {
          id: (page as { id: string }).id,
          name,
          role,
          unit,
          status,
        };
      });

    return { configured: true, members };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Notion query failed";
    return {
      configured: true,
      members: [],
      error: msg,
      hint: "Share the Staff Roster database with your Notion integration (⋯ → Connections).",
    };
  }
}
