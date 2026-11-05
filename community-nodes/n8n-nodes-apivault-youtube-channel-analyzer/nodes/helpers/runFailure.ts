const TERMINAL_FAILURES = new Set(['FAILED', 'TIMED-OUT', 'ABORTED']);

// Accept only an identifier and an enumerated status; never expose upstream error text.
export function formatRunFailure(runId: string, terminalStatus = ''): string {
	const safeId = /^[A-Za-z0-9_-]{1,100}$/.test(runId) ? runId : '';
	if (safeId && TERMINAL_FAILURES.has(terminalStatus)) {
		return `Run ${safeId} ended with status ${terminalStatus}. This run has finished. Inspect https://console.apify.com/view/runs/${safeId} for diagnostics before starting another run.`;
	}
	return safeId
		? `Could not finish reading run ${safeId}; inspect https://console.apify.com/view/runs/${safeId} and select Read Existing Run to resume reading without starting a paid duplicate.`
		: 'Could not confirm the Actor request. Check inputs, credentials and Apify Console before retrying; a run might already have started.';
}
