import { listOpsRecords } from "./notion-ops";

export type StaffMember = {
  id: string;
  name: string;
  role: string;
  unit: string;
  status: string;
};

export async function listStaffMembers(): Promise<{
  configured: boolean;
  members: StaffMember[];
  error?: string;
  hint?: string;
}> {
  const result = await listOpsRecords("staff");
  return {
    configured: result.configured,
    error: result.error,
    hint: result.hint,
    members: result.records.map((r) => ({
      id: r.id,
      name: r.title,
      role: r.detail || "—",
      unit: r.date || "—",
      status: r.status,
    })),
  };
}
