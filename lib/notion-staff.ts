import { Client } from "@notionhq/client";

export type StaffMember = {
  id: string;
  name: string;
  role: string;
  unit: string;
  status: string;
};

function notionConfigured(): boolean {
  return Boolean(
    process.env.NOTION_TOKEN?.trim() &&
      process.env.NOTION_STAFF_DATABASE_ID?.trim()
  );
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

/**
 * Optional staff roster from a Notion database.
 * Expected properties: Name (title), Role, Unit, Status.
 */
export async function listStaffMembers(): Promise<{
  configured: boolean;
  members: StaffMember[];
  error?: string;
}> {
  if (!notionConfigured()) {
    return { configured: false, members: [] };
  }

  const notion = new Client({ auth: process.env.NOTION_TOKEN });
  const database_id = process.env.NOTION_STAFF_DATABASE_ID!.replace(/-/g, "");

  try {
    const res = await notion.databases.query({
      database_id,
      page_size: 50,
    });

    const members: StaffMember[] = res.results
      .filter((r) => "properties" in r)
      .map((page) => {
        const props = (page as { id: string; properties: Record<string, unknown> })
          .properties;
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
        const status =
          plain(props.Status) || plain(props.status) || "Active";
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
    return { configured: true, members: [], error: msg };
  }
}
