// Normalize only documented obsolete defaults; keep valid explicit values unchanged.
export function normalizeActorInput(body: Record<string, unknown>): void {
	const value = body['maxItems'];
	if (value === undefined) return;
	if (value === 0) { delete body['maxItems']; return; }
	if (!Number.isInteger(value) || (value as number) < 1 || (value as number) > 10000) throw new Error('Invalid maxItems');
}
