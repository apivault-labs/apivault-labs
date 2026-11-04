// Normalize only documented obsolete defaults; keep valid explicit values unchanged.
export function normalizeActorInput(body: Record<string, unknown>): void {
	const value = body['topGlobalRank'];
	if (value === undefined) return;
	if (value === 0) { delete body['topGlobalRank']; return; }
	if (!Number.isInteger(value) || (value as number) < 1) throw new Error('Invalid topGlobalRank');
}
