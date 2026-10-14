# Tennis Abstract Scraper for n8n

ATP/WTA match history, H2H, rankings, Elo, optional score verification, model features and correction history. Hosted Apify Actor; usage charges apply.

## Install

Install `n8n-nodes-apivault-tennis-abstract-bulk-scraper` in Settings → Community nodes on a self-hosted n8n instance. Select your own Apify credential. Import `examples/quickstart-workflow.json`, replace the example Actor inputs and keep the workflow manual until you have reviewed the result. The template is inactive and contains no credentials.

This connector calls the hosted [Actor](https://apify.com/apivault_labs/tennis-abstract-bulk-scraper) through the Apify API. It offers Run and Read Results, and Read Existing Run to resume without a paid duplicate. Choose Run, Rows and Diagnostics to inspect SUMMARY, ERRORS and the truncation flag. Dataset Rows emits one n8n item per downloaded row. Availability, completeness and result fields depend on the Actor.

The event cap defaults to $0.05. Review [Actor pricing](https://apify.com/apivault_labs/tennis-abstract-bulk-scraper/pricing) before raising it; platform usage may be billed separately. Maximum Rows to Read is a download cap, not a paid collection limit. Set a result limit in Actor Input too. Start requests are never automatically retried. For failed or timed-out waiting, inspect the run in Apify before starting another.

Publication on npm makes this a community package. n8n Cloud availability depends on separate review and verification by n8n; this package does not claim verified status. No runtime dependencies are included.

[Actor inputs](https://apify.com/apivault_labs/tennis-abstract-bulk-scraper/input) · [npm](https://www.npmjs.com/package/n8n-nodes-apivault-tennis-abstract-bulk-scraper) · [GitHub](https://github.com/apivault-labs/apivault-labs/tree/main/community-nodes/n8n-nodes-apivault-tennis-abstract-bulk-scraper)


## Three bounded examples

| Goal | Input | Output |
|---|---|---|
| Player history with score checks | `examples/player-history.json` | Up to 3 Iga Swiatek match rows with verification status and checked fields |
| Head-to-head | `examples/head-to-head.json` | Up to 3 Sinner versus Alcaraz match rows |
| Model dataset | `examples/model-dataset.json` | Match rows with pre-tournament features; canonical training records in the run's MODEL_DATASET KVS record |

All examples call the public Actor. Base events cost $0.19/1,000 match/ranking/Elo rows, plus $0.00005 start and separate platform/proxy/storage usage. These examples do not request the paid charting add-on. A 3-match example has $0.00062 custom event charges before resource usage. Always inspect SUMMARY errors, verification status and downloaded-row truncation.

Verification covers listed participants/winner/score fields, not all match statistics. Features use the source's currently observed history before the target tournament start; historical as-of correctness is not established. Current Elo and target/same-tournament results are excluded. Correction tracking is opt-in and begins with your own baseline; use one monitoringKey sequentially.

MODEL_DATASET, VERIFICATION_COVERAGE, OBSERVATION and CORRECTIONS are run key-value-store records, not ordinary Dataset rows. Read them with the Apify API or Python `client.record(run_id, key)`. The n8n node's full output contains keyValueStoreId: use that ID with an authenticated HTTP Request node if you need these additional records.
