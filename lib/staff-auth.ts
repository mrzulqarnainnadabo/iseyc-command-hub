/**
 * Simple staff gate — same idea as Civic Mandate operator key.
 * Key is server-only (ISEYC_STAFF_KEY). Never expose to the browser bundle.
 */
export function staffKeyConfigured(): boolean {
  return Boolean(process.env.ISEYC_STAFF_KEY?.trim());
}

export function isValidStaffKey(provided: string | null | undefined): boolean {
  const expected = process.env.ISEYC_STAFF_KEY?.trim();
  if (!expected || !provided) return false;
  return provided.trim() === expected;
}

export function getBearerKey(authHeader: string | null): string | null {
  if (!authHeader?.startsWith("Bearer ")) return null;
  return authHeader.slice(7).trim() || null;
}
