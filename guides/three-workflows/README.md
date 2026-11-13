# Three useful Apify workflows

ApiVault Labs maintains the Actors in this kit. These are small, editable workflows for a first useful export. They do not send outreach, submit contact forms or activate a schedule. Owner QA is not customer adoption.

| Outcome | n8n import | Make import | Row unit |
|---|---|---|---|
| Shopify + Klaviyo leads → contact evidence → CSV / Sheets | [Shopify agencies](shopify-agencies/n8n.json) | [Source CSV starter](shopify-agencies/make.blueprint.json) | One domain |
| Shopify catalog → variant prices / observed changes → CSV / Sheets | [Competitor prices](competitor-prices/n8n.json) | [Source CSV starter](competitor-prices/make.blueprint.json) | One variant in one market/currency |
| Selected-company jobs → stable IDs → CSV / Sheets | [Company jobs](company-jobs/n8n.json) | [Source CSV starter](company-jobs/make.blueprint.json) | One LinkedIn job ID |

**Status:** n8n engine acceptance is recorded in `verification.json`. Make files are explicitly **source CSV starters**, not complete contact joins, price-diff pipelines or Sheets upserts. Do not advertise them as six fully tested end-to-end integrations. A working source export and a working destination are different checks.

## First run in n8n

1. Import the relevant `n8n.json`. Built-in Manual Trigger, Code, HTTP Request and Google Sheets nodes are used; no community package is required. The workflow is inactive.
2. Create an HTTP Header Auth credential: name `Authorization`, value `Bearer YOUR_APIFY_TOKEN`. Select it on **every** HTTP Request node. Do not put tokens into URLs, input JSON or exported workflow files. Use a scoped token that can run the chosen Actor and read its run/dataset. Monitoring also needs its named state resources.
3. Open **Configure**. Review `input`, including country/technologies, store URL or numeric company IDs. Limits start at3 websites/products or5 jobs. Confirm current prices in Apify Console and keep the API charge ceiling. Platform/proxy charges can be separate.
4. Leave `target: "csv"`. Execute manually. Download the binary file from **Download CSV**. Compare its row count and identifiers with **Prepare export** and the saved Apify dataset. An empty source can stop without a file; inspect the source run and SUMMARY rather than assuming a delivery failure.
5. For Sheets, create the tab named in Configure and paste the header from the scenario's `columns.csv` into row1. Set `sheetId`, select your Google credential on **Upsert by stable key**, then set `target: "sheets"`. Grant the account access to that spreadsheet. Formatting uses RAW values. Use one writer: Google Sheets upsert is not a database uniqueness constraint under concurrent writers.
6. Replay the **same saved run** with `resumeRunId` before enabling a schedule. For agencies, also set `resumeContactRunId` to replay the same contact pass. Confirm existing keys update rather than append. A CSV file is a snapshot; concatenate files only after deduplicating their stable keys.

Successful/failed execution data can contain contacts. Keep it private and configure retention for your deployment. The workflow retains execution data for recoverability; it adds no telemetry. CSV cells starting with spreadsheet formula prefixes are escaped.

## Shopify agencies: country and technology → contact evidence

The find input matches **both** Shopify and Klaviyo (`matchMode: all`) in GB, with3 distinct domains. Change ISO-2 country or technology names deliberately. A filter on a technology is an indexed match, not a current homepage verification. `verifyLive` applies to Detect mode, not Find.

The second Actor checks at most3 public pages per website for published contact links. It never submits a form. Keep `indexedEmails` separate from `observedEmails`; the latter preserves the source evidence returned by the contact Actor. `not_found`, blocked pages and `coverageComplete: false` do not establish that no contact exists. Neither indexed nor observed email proves mailbox deliverability or permission to contact someone.

Illustrative result: `example.com`, `contactStatus: found`, an observed mailto source URL and `checkedAt`. This domain is fictional, not an owner/customer lead. Actual owner QA returned3 matching records and3 contact-result rows, with one `contact-found` billing event; this does not mean all3 had contacts.

## Ecommerce teams: compare the same variant

The template uses Shopify Product Scraper with `flattenVariants: true`. **3 products can produce many variant rows**: the owner QA returned39 rows from3 products. `maxProducts` is not a variant-row cap. Delivery is bounded to1000 rows and fails if it detects overflow; increase scope only with paginated saved-dataset delivery.

A first run exports `first_observed` rows. Save its dataset ID. For a later comparison set `previousDatasetId` to that dataset, keeping the same store and collection settings. Independently confirm the storefront market and currency for **both** snapshots, then set `market` and `currency`. The source did not return a currency in the39-row QA sample. Empty values deliberately produce `comparison_skipped` rather than a price alert. These are declared comparison contexts, not source-detected currency.

Match by store + market + currency + variantId; SKU can be blank or reused. The mapper reports first observation, comparable price/availability changes and unchanged rows. A changed observed sample never proves additions/removals from the whole catalog. The template emits **no removed-product alerts**. It does not compare regional prices or estimate sales/revenue.

Shopify Store Analyzer can supply additional store-level context, but its `avg_order_value` change is not a per-variant price change. The owner QA correctly reported catalog/price comparisons skipped for incomplete snapshots; do not turn that into a SKU alert.

## Recruiters: first observed jobs at selected companies

Replace `companyIds` with numeric LinkedIn company IDs and choose your own lowercase `monitorKey`. Keep the same key and filters on future runs. The first run delivers a billed baseline. Later collection is a bounded public guest sample and may yield more previously unseen jobs; a nonempty repeat is not by itself a duplicate. `firstSeenAt` is not the publication date, and `freshnessVerified: false` remains false in the export.

The destination matches `rowKey = jobId`. It can recover a repeated delivery without another collection. Record the source run ID before editing the workflow. For monitor recovery, inspect SUMMARY and use its precise `recoveryDatasetId` instructions; do not clear state to make a failure disappear. A source refusal or rate limit is a failed/partial collection, not proof that a company has no vacancies.

## Make: import, CSV and remaining destination steps

1. Create an empty scenario, import `make.blueprint.json`, choose **your own Apify connection** in both native modules and review input/build/limits. No owner connection or sheet IDs are embedded.
2. Leave scheduling off and use **Run once**. The first module runs the Actor synchronously; the second returns its dataset as CSV. Inspect/download that module's output. Make has a120-second synchronous ceiling.
3. If the synchronous request times out, find the original run in Apify before retrying. Recover its `defaultDatasetId` with a standalone Get Dataset Items module. Repeating the entire scenario can start another billed collection. There is no claim of automatic paid-start idempotency.
4. Agencies: add the contact pass using the distinct exported domains, retain its separate run ID and join by normalized domain. Prices: save both datasets and compare stable variant IDs only under identical confirmed market/currency. Jobs: retain job IDs and recover saved datasets. The supplied n8n mapper in `transforms.js` documents those transformations.
5. To deliver to Google Sheets, add Search Rows by the stable key, then Update Row if found / Add Row if absent. Serialize writers. Test a second delivery and an interrupted delivery before enabling any schedule. No Google connection was present in the inspected Make account, so this final path is **not yet accepted**.

This repository distributes imports. It does not claim approval or listing in the n8n/Make template galleries. Native module source exports, Google OAuth delivery and community publication each have separate evidence in `verification.json`.

The owner-account diagnostic returned HTTP 401 / IM001 with `Required scope: scenarios:run`; the Make API token therefore cannot execute the saved QA scenarios. A separate test of the existing Apify connection returned HTTP 424 / SC424; that connection's cause is unresolved and it cannot be edited through the inspected API. This does not invalidate the working Apify token used in GitHub QA. No schedules were activated. These account checks are not evidence of a successful Make export.

## Costs, checked 2026-11-13 UTC / November14 Minsk

| Actor | Current primary event rate | Other costs |
|---|---|---|
| Tech Stack Lookup0.15.30 | $3 /1000 delivered website events | $0.00005 start per GB, minimum one; provider-paid platform resources exception retained |
| Contact Page & Form Finder0.1.4 | $0.64 /1000 found-contact-page website events | User-paid platform/proxy usage; no found event for blocked/not-found |
| Shopify Product Scraper1.0.16 | FREE plan $1.50 /1000 primary events; other listed plans $1 /1000 | $0.00005 start per GB, minimum one; check current platform/proxy terms |
| LinkedIn Jobs Scraper1.9.6 | $0.90 /1000 successful-result events | $0.00005 start per GB, minimum one; user-paid platform/proxy usage |

Hypothetical primary-event arithmetic:3 technology events cost $0.009;3 found-contact events cost $0.00192;5 job events cost $0.0045, before other applicable fees. These are illustrations, not invoices or cost-per-qualified-lead claims. Dataset rows, charged event counts and `usageTotalUsd` are distinct measurements; read the run billing record. n8n/Make plans, credits, retries and Google services can add costs. Monitor baselines are billable; empty repeats can still incur startup/resources.

## Evidence and reproduction

`verification.json` distinguishes live Actor QA, fictional local-engine tests, Make API results and unverified Google delivery. Public research aggregates contain no contacts/domains. Public imports contain no credentials. To regenerate from the maintained private source: `python campaigns/three-workflows/generate.py`; contract checks: `node campaigns/three-workflows/test.cjs`.

Primary docs: [Apify runs](https://docs.apify.com/api/v2/actors-runs-post), [dataset exports](https://docs.apify.com/storage/dataset), [Make Apify modules](https://apps.make.com/apify), [n8n HTTP credentials](https://docs.n8n.io/integrations/builtin/credentials/httprequest/), [n8n Google Sheets](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/).

Owned tools: [Tech Stack Lookup](https://apify.com/apivault_labs/tech-stack-lookup), [Contact Page & Form Finder](https://apify.com/apivault_labs/contact-page-form-finder), [Shopify Product Scraper](https://apify.com/apivault_labs/shopify-product-scraper), [LinkedIn Jobs Scraper](https://apify.com/apivault_labs/linkedin-jobs-scraper).
