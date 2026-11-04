// Normalize only documented obsolete defaults; keep valid explicit values unchanged.
export function normalizeActorInput(body: Record<string, unknown>): void {
	const value = body['sinceDays'];
	if (value === undefined) return;
	if (value === 0) { delete body['sinceDays']; return; }
	if (!Number.isInteger(value) || (value as number) < 1 || (value as number) > 3650) throw new Error('Invalid sinceDays');
}
