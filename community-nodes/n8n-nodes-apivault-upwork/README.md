# Upwork Job Scraper — n8n

Hosted Actor: https://apify.com/apivault_labs/upwork-job-scraper

The target Actor is currently under maintenance. This update repairs client transport only; fresh collection is not confirmed. Reading an existing accessible run remains available.

Install `n8n-nodes-apivault-upwork` in self-hosted n8n under Settings → Community nodes. Select your own Apify credential. Apify charges apply.

## 0.2.0 compatibility

Node registration, credential type, parameter names and input mapping are retained. Run Actor now starts asynchronously and reads paginated results. Read Existing Run resumes without a new paid POST. Version 1 retains its previous charge behavior unless an event cap is set. New version 2 defaults to a $0.05 event charge cap and 1,000 downloaded rows. Platform usage can be billed separately. Full output includes run metadata, SUMMARY and ERRORS when available. Download caps do not limit paid collection; configure Actor input limits and event cap.

No scraping implementation or runtime dependencies are bundled. n8n Cloud verification is not claimed.
