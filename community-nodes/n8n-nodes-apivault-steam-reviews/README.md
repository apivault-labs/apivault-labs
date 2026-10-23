# Steam Reviews for n8n

Collect Steam review text, recommendations, language, dates, votes and playtime for game feedback analysis.

## Install

Install `n8n-nodes-apivault-steam-reviews` in Settings в†’ Community nodes on a self-hosted n8n instance. Select your own Apify credential. Import `examples/quickstart-workflow.json`, replace the example Actor inputs and keep the workflow manual until you have reviewed the result. The template is inactive and contains no credentials.

This connector calls the hosted [Actor](https://apify.com/apivault_labs/steam-reviews-source-probe) through the Apify API. It offers Run and Read Results, and Read Existing Run to resume without a paid duplicate. Choose Run, Rows and Diagnostics to inspect SUMMARY, ERRORS and the truncation flag. Dataset Rows emits one n8n item per downloaded row. Availability, completeness and result fields depend on the Actor.

The event cap defaults to $0.05. Review [Actor pricing](https://apify.com/apivault_labs/steam-reviews-source-probe/pricing) before raising it; platform usage may be billed separately. Maximum Rows to Read is a download cap, not a paid collection limit. Set a result limit in Actor Input too. Start requests are never automatically retried. For failed or timed-out waiting, inspect the run in Apify before starting another.

Publication on npm makes this a community package. n8n Cloud availability depends on separate review and verification by n8n; this package does not claim verified status. No runtime dependencies are included.

[Actor inputs](https://apify.com/apivault_labs/steam-reviews-source-probe/input) | [npm](https://www.npmjs.com/package/n8n-nodes-apivault-steam-reviews) | [GitHub](https://github.com/apivault-labs/apivault-labs/tree/main/community-nodes/n8n-nodes-apivault-steam-reviews)


## Related integration

[Python client](https://github.com/apivault-labs/apivault-labs/tree/main/packages/apivault-steam-reviews) · [PyPI](https://pypi.org/project/apivault-steam-reviews/) · [n8n source and workflow](https://github.com/apivault-labs/apivault-labs/tree/main/community-nodes/n8n-nodes-apivault-steam-reviews) · [npm](https://www.npmjs.com/package/n8n-nodes-apivault-steam-reviews)


## Steam data and continuation

Reviews are collected in recent creation order for supplied numeric Steam app IDs. Set `maxReviews` to bound collection (up to 10,000 per run). Language, recommendation, purchase, paired date and playtime filters depend on the hosted Actor inputs. Output playtime is in minutes; input playtime filters use whole hours. Author identifiers and profiles are not included. Missing fields are null. Results are not guaranteed to cover every review.

Inspect SUMMARY for partial results and stop reasons. Reading an existing run downloads its saved rows and does not continue source collection. To continue collection, copy the CONTINUATION input from that run’s key-value store into a new, separately billed run. The connector does not automatically start continuation runs.
