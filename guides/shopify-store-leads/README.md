# Shopify Store Leads — public API examples

Run the independent [Shopify Store Leads Scraper](https://apify.com/apivault_labs/shopify-store-leads-scraper). It finds a bounded sample of product sellers and public contacts with evidence URLs. Product ratings and self-published store ratings have different scopes; missing values stay unknown.

See [current inputs](https://apify.com/apivault_labs/shopify-store-leads-scraper/input-schema) and [pricing](https://apify.com/apivault_labs/shopify-store-leads-scraper/pricing). $4 per 1,000 delivered rows +$0.00005/start and caller-paid platform usage as checked19October2026. Contact filters exclude candidates before Dataset billing.

```json
{"searchTerms":["organic coffee"],"maxStores":3,"requireEmail":true}
```

Use the standard Apify client (example.py) with your own APIFY_TOKEN. Inspect Dataset, SUMMARY and ERRORS. No login or separate source key is needed; source rate limits and protected storefronts can yield partial data. Optional delivery-history lists and previous-Dataset imports can exclude previously delivered domains; see below.

Hosted MCP: https://mcp.apify.com?tools=apivault_labs/shopify-store-leads-scraper

This is a separate Actor from [Shopify Store Analyzer](https://apify.com/apivault_labs/shopify-store-analyzer). The [Analyzer n8n node](https://www.npmjs.com/package/n8n-nodes-apivault-shopify-analyzer) and [Analyzer Python SDK](https://pypi.org/project/shopify-store-analyzer/) target Analyzer, not this leads Actor. No dedicated n8n/Python package is published for the new Actor; use the standard Apify API/client or generic HTTP node.

<!-- competitive-features:start -->
## Expanded research and qualification

The current [Shopify Store Leads Scraper](https://apify.com/apivault_labs/shopify-store-leads-scraper) supports category-only discovery, multiple merchant-origin countries, product shipping/price/rating filters, contact evidence and best-email selection, optional MX checks, observed apps/themes, public catalog pagination, collections and policies, delivery-history lists, previous-Dataset exclusion, optional Chromium and Apify Proxy, flat CSV-friendly records, and bounded HTTP concurrency.

```json
{"searchTerms":["organic coffee"],"countries":["US","CA"],"requireBestEmail":true,"maxStores":3,"maxStoresScanned":15,"skipPreviouslyScraped":true,"leadListName":"coffee-prospects"}
```

Enable history from the first run and run one job at a time per list. Keep the account's named KV store to retain delivered-domain history. `previousDatasetId` imports a Dataset accessible to the caller; inaccessible input fails safely. Filtered candidates do not produce charged Dataset rows.

```json
{"storeUrls":["https://www.freshroastedcoffee.com"],"hasApps":["Klaviyo"],"inStockOnly":true,"includeCatalog":true,"maxProductsPerStore":20,"maxStores":1}
```

Catalog filters inspect the observed public sample. Exact total count requires source exhaustion; bounded samples expose a lower bound. Collection scope is never a complete store count. `minPrice`/`maxPrice` are major storefront currency units; discovery `priceMinMinor`/`priceMaxMinor` are minor units. A product publication date does not establish the store's launch date. App signatures do not prove an app is absent.

```json
{"storeUrls":["https://exhalecoffee.com"],"renderJs":"on","shipsToCountries":["GB"],"maxStores":1,"maxContactPages":0}
```

Browser rendering needs at least512MiB; this is the default memory. HTTP-only jobs can choose256MiB. Proxy use is opt-in, off by default, and may incur caller-paid proxy costs. No login or challenge bypass is provided. Shipping-country declarations use public tokenless Storefront data when exposed; they are not a checkout guarantee.

## Current limits and integrations

- Inspect Dataset records together with run `SUMMARY` and `ERRORS`. Source failure is not an empty successful search.
- Discovery is a bounded sample of matching product sellers, not a complete merchant database. Common Crawl is an optional historical seed source; it returned HTTP504 during release checks on20October2026.
- Product and variant ratings retain their scopes. Matching storefront JSON-LD ratings are self-published. An independent merchant rating and verified Shopify billing plan, launch date, revenue or traffic are not supplied. The public Shop profile was inaccessible during release diagnosis.
- `best_email` is evidence-based contact selection; optional MX checks establish mail routing, not mailbox deliverability or consent. `lead_score` measures observed data completeness, not sales conversion.
- Use your own Apify token in the standard API client or a generic n8n HTTP Request node. No dedicated Leads npm/PyPI package or verified n8n Cloud node is claimed. Analyzer packages target a different Actor.
- [Hosted MCP](https://mcp.apify.com?tools=apivault_labs/shopify-store-leads-scraper) and [current input schema](https://apify.com/apivault_labs/shopify-store-leads-scraper/input-schema).

Price remains$4/1000delivered store rows plus$0.00005/start and caller-paid Apify platform usage. Contactless discovery rows have the same row price; use contact filters before expanding. Platform and optional proxy costs depend on the job and caller plan. This documentation makes no Top1 claim.
<!-- competitive-features:end -->
