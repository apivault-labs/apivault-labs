# Shopify Store Leads — public API examples

Run the independent [Shopify Store Leads Scraper](https://apify.com/apivault_labs/shopify-store-leads-scraper). It finds a bounded sample of product sellers and public contacts with evidence URLs. Product ratings and self-published store ratings have different scopes; missing values stay unknown.

See [current inputs](https://apify.com/apivault_labs/shopify-store-leads-scraper/input-schema) and [pricing](https://apify.com/apivault_labs/shopify-store-leads-scraper/pricing). $4 per 1,000 delivered rows +$0.00005/start and caller-paid platform usage as checked19October2026. Contact filters exclude candidates before Dataset billing.

```json
{"searchTerms":["organic coffee"],"maxStores":3,"requireEmail":true}
```

Use the standard Apify client (example.py) with your own APIFY_TOKEN. Inspect Dataset, SUMMARY and ERRORS. No login or separate source key is needed; source rate limits and protected storefronts can yield partial data. No cross-run deduplication.

Hosted MCP: https://mcp.apify.com?tools=apivault_labs/shopify-store-leads-scraper

This is a separate Actor from [Shopify Store Analyzer](https://apify.com/apivault_labs/shopify-store-analyzer). The [Analyzer n8n node](https://www.npmjs.com/package/n8n-nodes-apivault-shopify-analyzer) and [Analyzer Python SDK](https://pypi.org/project/shopify-store-analyzer/) target Analyzer, not this leads Actor. No dedicated n8n/Python package is published for the new Actor; use the standard Apify API/client or generic HTTP node.
