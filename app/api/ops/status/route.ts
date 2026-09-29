import { NextResponse } from "next/server";
import { opsConfigStatus } from "@/lib/notion-ops";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Public config flags only — no secrets, no row data. */
export async function GET() {
  return NextResponse.json({
    ok: true,
    stack: "notion+vercel",
    supabase: false,
    notion: opsConfigStatus(),
  });
}
