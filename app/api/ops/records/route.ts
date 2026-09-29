import { NextRequest, NextResponse } from "next/server";
import { getBearerKey, isValidStaffKey, staffKeyConfigured } from "@/lib/staff-auth";
import { listOpsRecords, type OpsKind } from "@/lib/notion-ops";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const KINDS = new Set<OpsKind>(["meetings", "chamber", "media", "staff"]);

export async function GET(req: NextRequest) {
  if (!staffKeyConfigured()) {
    return NextResponse.json(
      { ok: false, error: "ISEYC_STAFF_KEY not configured on Vercel." },
      { status: 503 }
    );
  }

  const key = getBearerKey(req.headers.get("authorization"));
  if (!isValidStaffKey(key)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const kind = (req.nextUrl.searchParams.get("kind") || "") as OpsKind;
  if (!KINDS.has(kind)) {
    return NextResponse.json(
      { ok: false, error: "kind must be meetings|chamber|media|staff" },
      { status: 400 }
    );
  }

  const result = await listOpsRecords(kind);
  return NextResponse.json({
    ok: true,
    kind,
    configured: result.configured,
    records: result.records,
    error: result.error ?? null,
    hint: result.hint ?? null,
  });
}
