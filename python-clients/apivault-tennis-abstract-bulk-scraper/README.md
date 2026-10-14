# Tennis Abstract Scraper — Python client

ATP/WTA match history, H2H, rankings, Elo, optional score verification, model features and correction history. Hosted Apify Actor; usage charges apply.

This client starts the hosted [Apify Actor](https://apify.com/apivault_labs/tennis-abstract-bulk-scraper), waits for completion and downloads Dataset records. It also reads SUMMARY and ERRORS when available. Source coverage and result fields depend on the Actor.

## Install

```bash
pip install apivault-tennis-abstract-bulk-scraper
```

## Run

Set `APIFY_TOKEN` in your environment. Replace the example values with your own valid inputs from the [Actor input form](https://apify.com/apivault_labs/tennis-abstract-bulk-scraper/input).

```python
from apivault_tennis_abstract_bulk_scraper import Client, WaitTimeout

client = Client()
actor_input = {
    "players": [
        "Iga Swiatek"
    ],
    "maxResults": 3
}
result = client.run(actor_input, max_total_charge_usd=0.05, max_rows=100)
print(result.run_id, len(result.rows), result.truncated)
print(result.summary)
```

An Apify account and token are required. The package has no subscription of its own; hosted runs are billed by Apify under the Actor pricing. The event charge cap may not include platform usage. Review the [current price](https://apify.com/apivault_labs/tennis-abstract-bulk-scraper/pricing) before changing it. `max_rows` limits the download, not the Actor collection or its charges; configure an Actor result limit too.

## Resume and diagnostics

`client.start(input)` returns a run ID; `client.wait(run_id)` and `client.result(run_id)` resume an existing run. A `WaitTimeout` exposes `run_id`. Starting a run is never automatically retried. Use an existing run ID after a connection or waiting failure to avoid duplicate paid runs. Failed and aborted runs raise `ActorError`. No-match and partial results require inspecting `summary` and `errors`; diagnostic rows must not be mistaken for useful results.

Rows can be serialized as JSON or used in your own CSV/Excel pipeline. Native Dataset exports are available in Apify. Optional integrations and credentials depend on the Actor.

[Hosted Actor](https://apify.com/apivault_labs/tennis-abstract-bulk-scraper) · [Source](https://github.com/apivault-labs/apivault-labs/tree/main/python-clients/apivault-tennis-abstract-bulk-scraper) · [PyPI](https://pypi.org/project/apivault-tennis-abstract-bulk-scraper/)


## Three bounded examples

| Goal | Input | Output |
|---|---|---|
| Player history with score checks | `examples/player-history.json` | Up to 3 Iga Swiatek match rows with verification status and checked fields |
| Head-to-head | `examples/head-to-head.json` | Up to 3 Sinner versus Alcaraz match rows |
| Model dataset | `examples/model-dataset.json` | Match rows with pre-tournament features; canonical training records in the run's MODEL_DATASET KVS record |

All examples call the public Actor. Base events cost $0.19/1,000 match/ranking/Elo rows, plus $0.00005 start and separate platform/proxy/storage usage. These examples do not request the paid charting add-on. A 3-match example has $0.00062 custom event charges before resource usage. Always inspect SUMMARY errors, verification status and downloaded-row truncation.

Verification covers listed participants/winner/score fields, not all match statistics. Features use the source's currently observed history before the target tournament start; historical as-of correctness is not established. Current Elo and target/same-tournament results are excluded. Correction tracking is opt-in and begins with your own baseline; use one monitoringKey sequentially.

MODEL_DATASET, VERIFICATION_COVERAGE, OBSERVATION and CORRECTIONS are run key-value-store records, not ordinary Dataset rows. Read them with the Apify API or Python `client.record(run_id, key)`. The n8n node's full output contains keyValueStoreId: use that ID with an authenticated HTTP Request node if you need these additional records.

GitHub install is available even when PyPI publication is pending:

```bash
pip install "git+https://github.com/apivault-labs/apivault-labs.git#subdirectory=python-clients/apivault-tennis-abstract-bulk-scraper"
```

Source requests may take several minutes. The Tennis connector allows a 900-second Actor timeout and up to 20 minutes of waiting. Resume the existing run after a waiting failure; starting another run incurs another charge.

Actual observed output excerpts with run IDs are in `examples/*-result.json`. They are historical QA samples, not a freshness guarantee or fabricated live output.
