// Normalize only documented obsolete defaults; keep valid explicit values unchanged.
export function normalizeActorInput(body: Record<string, unknown>): void {
	// These nullable filters historically used zero as an empty UI placeholder.
	for (const key of ['maxVisits', 'maxBounce', 'minSearchShare', 'minSourceShare', 'minPagesPerVisit', 'minTimeOnSite', 'minGrowthPercent']) {
		if (body[key] === 0) delete body[key];
	}
	const value = body['topGlobalRank'];
	if (value === undefined) return;
	if (value === 0) { delete body['topGlobalRank']; return; }
	if (!Number.isInteger(value) || (value as number) < 1) throw new Error('Invalid topGlobalRank');
}
