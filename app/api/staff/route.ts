import { NextRequest, NextResponse } from "next/server";
import { getBearerKey, isValidStaffKey, staffKeyConfigured } from "@/lib/staff-auth";
import { listStaffMembers } from "@/lib/notion-staff";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!staffKeyConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error: "Staff key not configured. Set ISEYC_STAFF_KEY on Vercel.",
      },
      { status: 503 }
    );
  }

  const key = getBearerKey(req.headers.get("authorization"));
  if (!isValidStaffKey(key)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const roster = await listStaffMembers();
  return NextResponse.json({
    ok: true,
    notionConfigured: roster.configured,
    members: roster.members,
    error: roster.error ?? null,
    hint: roster.hint ?? null,
  });
}
