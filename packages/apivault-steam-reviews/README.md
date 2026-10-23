# Steam Reviews - Python client

Collect Steam review text, recommendations, language, dates, votes and playtime for game feedback analysis.

This client starts the hosted [Apify Actor](https://apify.com/apivault_labs/steam-reviews-source-probe), waits for completion and downloads Dataset records. It also reads SUMMARY and ERRORS when available. Source coverage and result fields depend on the Actor.

## Install

```bash
pip install apivault-steam-reviews
```

## Run

Set `APIFY_TOKEN` in your environment. Replace the example values with your own valid inputs from the [Actor input form](https://apify.com/apivault_labs/steam-reviews-source-probe/input).

```python
from apivault_steam_reviews import Client, WaitTimeout

client = Client()
actor_input = {
    "appIds": [
        620
    ],
    "maxReviews": 10,
    "languages": [
        "english"
    ]
}
result = client.run(actor_input, max_total_charge_usd=0.05, max_rows=100)
print(result.run_id, len(result.rows), result.truncated)
print(result.summary)
```

An Apify account and token are required. The package has no subscription of its own; hosted runs are billed by Apify under the Actor pricing. The event charge cap may not include platform usage. Review the [current price](https://apify.com/apivault_labs/steam-reviews-source-probe/pricing) before changing it. `max_rows` limits the download, not the Actor collection or its charges; configure an Actor result limit too.

## Resume and diagnostics

`client.start(input)` returns a run ID; `client.wait(run_id)` and `client.result(run_id)` resume an existing run. A `WaitTimeout` exposes `run_id`. Starting a run is never automatically retried. Use an existing run ID after a connection or waiting failure to avoid duplicate paid runs. Failed and aborted runs raise `ActorError`. No-match and partial results require inspecting `summary` and `errors`; diagnostic rows must not be mistaken for useful results.

Rows can be serialized as JSON or used in your own CSV/Excel pipeline. Native Dataset exports are available in Apify. Optional integrations and credentials depend on the Actor.

[Hosted Actor](https://apify.com/apivault_labs/steam-reviews-source-probe) | [Source](https://github.com/apivault-labs/apivault-labs/tree/main/packages/apivault-steam-reviews) | [PyPI](https://pypi.org/project/apivault-steam-reviews/)


## Related integration

[Python client](https://github.com/apivault-labs/apivault-labs/tree/main/packages/apivault-steam-reviews) · [PyPI](https://pypi.org/project/apivault-steam-reviews/) · [n8n source and workflow](https://github.com/apivault-labs/apivault-labs/tree/main/community-nodes/n8n-nodes-apivault-steam-reviews) · [npm](https://www.npmjs.com/package/n8n-nodes-apivault-steam-reviews)


## Steam data and continuation

Reviews are collected in recent creation order for supplied numeric Steam app IDs. Set `maxReviews` to bound collection (up to 10,000 per run). Language, recommendation, purchase, paired date and playtime filters depend on the hosted Actor inputs. Output playtime is in minutes; input playtime filters use whole hours. Author identifiers and profiles are not included. Missing fields are null. Results are not guaranteed to cover every review.

Inspect SUMMARY for partial results and stop reasons. Reading an existing run downloads its saved rows and does not continue source collection. To continue collection, copy the CONTINUATION input from that run’s key-value store into a new, separately billed run. The connector does not automatically start continuation runs.
