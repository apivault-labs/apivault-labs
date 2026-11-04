// Normalize only documented obsolete defaults; keep valid explicit values unchanged.
export function normalizeActorInput(body: Record<string, unknown>): void {
	const value = body['daysSinceListed'];
	if (value === undefined) return;
	if (value === 0) { delete body['daysSinceListed']; return; }
	if (!Number.isInteger(value) || (value as number) < 1 || (value as number) > 90) throw new Error('Invalid daysSinceListed');
}
