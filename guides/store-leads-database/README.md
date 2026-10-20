# Store Leads Database: API, Python and n8n

[Store Leads on Apify](https://apify.com/apivault_labs/store-leads-database) · [Input schema](https://apify.com/apivault_labs/store-leads-database/input-schema) · [MCP endpoint](https://mcp.apify.com?tools=apivault_labs/store-leads-database)

Export indexed e-commerce store prospects across Shopify, WooCommerce, Magento, PrestaShop, BigCommerce, Wix Stores and Squarespace Commerce. Every result requires stored commerce-platform evidence. General CMS labels alone do not qualify. Source records overlap; exported domains are deduplicated within the run. Source dates and optional contacts do not guarantee current activity, reachability or consent.

## Small first request

```json
{"storePlatforms":["shopify"],"country":["US"],"hasEmail":true,"maxItems":10,"outputPreset":"contacts"}
```

Actor ID: `apivault_labs/store-leads-database` (`QZmdcI6vZKbk6Y4Js`). Price: $0.006 per delivered domain, $0.00005/start event/GB (minimum one), plus user-paid Apify resources. A 10-row sample has $0.06 in lead events before startup/resources. Count diagnostics produce no lead rows; running still consumes resources.

## Python

The adjacent [example.py](example.py) uses Python's standard library. Set your token in `APIFY_TOKEN` locally; never put it in a URL or commit it. Run `python example.py --max-items 10`. It starts once, polls the same run, checks `SUMMARY`, and writes results to a local JSON file. Do not restart automatically after a request timeout: check the existing Apify run first to avoid duplicate delivery.

## n8n

Import [n8n-workflow.json](n8n-workflow.json). Select an **HTTP Header Auth** credential on both HTTP Request nodes: header name `Authorization`, value `Bearer YOUR_APIFY_TOKEN`. No secret is embedded in the template. Inspect and edit the JSON input before running.

The workflow starts a run and waits up to 60 seconds. If still running, it stops with that run ID instead of starting another paid run. Open the existing run in Apify Console, wait for completion and download its Dataset; do not rerun just to fetch existing results. The completed branch downloads JSON. This is a manual HTTP workflow, not a published or verified n8n community node.

## Counts, pages and diagnostics

Use `workflow: "count"` with your audience filters before a large export. `COUNT_SUMMARY.total` counts matching source records before cross-source deduplication, not unique stores. Snapshot: 26,570,455 records on 20 October 2026 with all seven platforms and no contact/country restriction. Read `isComplete` and `ERRORS`.

Copy `EXPORT_CONTINUATION.resumeInput` into the next run. The index can change between runs; pages are not a frozen snapshot. A source failure is partial coverage. `SUMMARY`, `ERRORS`, `COUNT_SUMMARY` and continuation are KV diagnostics, not invented paid leads. CSV/Excel/JSON can be downloaded from the same existing Dataset.

No dedicated npm/PyPI package is claimed for this Actor. These examples target this exact Actor, not Shopify Analyzer or the broader Website Leads Database.
