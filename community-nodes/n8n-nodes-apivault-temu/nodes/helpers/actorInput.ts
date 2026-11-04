// Normalize only documented obsolete defaults; keep valid explicit values unchanged.
export function normalizeActorInput(body: Record<string, unknown>): void {
	const value = body['timeout'];
	if (value === undefined) return;
	if (value === 180) { body['timeout'] = 30; return; }
	if (!Number.isInteger(value) || (value as number) < 20 || (value as number) > 60) throw new Error('Invalid timeout');
}
