import { Client } from "@notionhq/client";

/** Shared Notion client — server only. Token reused from Civic Mandate integration. */
export function getNotionClient(): Client | null {
  const token = process.env.NOTION_TOKEN?.trim();
  if (!token) return null;
  return new Client({ auth: token });
}

export function normalizeDatabaseId(raw: string | undefined): string {
  return (raw || "").replace(/-/g, "").trim();
}

export function plainProp(prop: unknown): string {
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
  if (p.type === "date" && p.date && typeof p.date === "object") {
    return String((p.date as { start?: string }).start || "");
  }
  if (p.type === "multi_select" && Array.isArray(p.multi_select)) {
    return (p.multi_select as { name?: string }[])
      .map((x) => x.name || "")
      .filter(Boolean)
      .join(", ");
  }
  return "";
}
