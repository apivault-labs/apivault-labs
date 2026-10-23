# Install ApiVault Python clients from pinned GitHub sources

These six Python clients are public on GitHub and installable with pip from a pinned source checkout. Their0.1.0 PyPI releases are still pending after an upload rate limit. Commands below install approved source revisions; they do not claim that the PyPI releases are available.

Requirements: Python3.10 or newer, Git on PATH, internet access to GitHub and standard build requirements (setuptools/wheel). Use a virtual environment and a short working directory, especially on Windows (for example C:\src). Installation clones a specific public revision and installs its package subdirectory: [pip local project documentation](https://pip.pypa.io/en/stable/topics/local-project-installs/).

```bash
python -m venv .venv
# Activate .venv using your shell's usual command before installing.
```

Each client below was installed into a fresh test environment. The public Git origin and exact checkout HEAD, installed version, PEP610 local directory origin and permanent Actor ID were checked. Each installed client read an existing real successful run without starting another paid run. Raw direct VCS pip URLs can hit long temporary build paths on Windows; the tested short-checkout method avoids that failure.

### Clone once into a short path

The repository also contains long community-node paths. Enable Git long paths for each Git command below using -c; this does not change global Git configuration. Keeping the checkout path short also avoids Windows wheel-build path limits. Run the clone once before choosing a package below.

```bash
git -c core.longpaths=true clone --filter=blob:none --no-checkout https://github.com/apivault-labs/apivault-labs.git av
```

Use the exact revision listed for each package. The checked-out files are the approved source snapshots, not a floating main branch.

## apivault-google-news-search

[Hosted Actor](https://apify.com/apivault_labs/google-news-search) | [Source](https://github.com/apivault-labs/apivault-labs/tree/348f82894d1a5685a4e1ccd3b1d73c8eeedbe6ba/packages/apivault-google-news-search)

```bash
git -C av -c core.longpaths=true checkout --detach 348f82894d1a5685a4e1ccd3b1d73c8eeedbe6ba
python -m pip install "./av/packages/apivault-google-news-search"
```

```python
from apivault_google_news_search import Client

# Set your own APIFY_TOKEN in the environment.
# Read a successful run from your own account without starting another run.
result = Client().result("YOUR_EXISTING_RUN_ID", max_rows=10)
print(result.summary)
print(result.rows)
```

## apivault-threads-scraper

[Hosted Actor](https://apify.com/apivault_labs/threads-scraper) | [Source](https://github.com/apivault-labs/apivault-labs/tree/348f82894d1a5685a4e1ccd3b1d73c8eeedbe6ba/packages/apivault-threads-scraper)

```bash
git -C av -c core.longpaths=true checkout --detach 348f82894d1a5685a4e1ccd3b1d73c8eeedbe6ba
python -m pip install "./av/packages/apivault-threads-scraper"
```

```python
from apivault_threads_scraper import Client

# Set your own APIFY_TOKEN in the environment.
# Read a successful run from your own account without starting another run.
result = Client().result("YOUR_EXISTING_RUN_ID", max_rows=10)
print(result.summary)
print(result.rows)
```

## apivault-substack-archive-scraper

[Hosted Actor](https://apify.com/apivault_labs/substack-archive-scraper) | [Source](https://github.com/apivault-labs/apivault-labs/tree/8c43e5b9c7d3549801e07a5fee01f1e0952568bc/packages/apivault-substack-archive-scraper)

```bash
git -C av -c core.longpaths=true checkout --detach 8c43e5b9c7d3549801e07a5fee01f1e0952568bc
python -m pip install "./av/packages/apivault-substack-archive-scraper"
```

```python
from apivault_substack_archive_scraper import Client

# Set your own APIFY_TOKEN in the environment.
# Read a successful run from your own account without starting another run.
result = Client().result("YOUR_EXISTING_RUN_ID", max_rows=10)
print(result.summary)
print(result.rows)
```

## apivault-youtube-transcripts-scraper

[Hosted Actor](https://apify.com/apivault_labs/youtube-transcripts-scraper) | [Source](https://github.com/apivault-labs/apivault-labs/tree/8c43e5b9c7d3549801e07a5fee01f1e0952568bc/packages/apivault-youtube-transcripts-scraper)

```bash
git -C av -c core.longpaths=true checkout --detach 8c43e5b9c7d3549801e07a5fee01f1e0952568bc
python -m pip install "./av/packages/apivault-youtube-transcripts-scraper"
```

```python
from apivault_youtube_transcripts_scraper import Client

# Set your own APIFY_TOKEN in the environment.
# Read a successful run from your own account without starting another run.
result = Client().result("YOUR_EXISTING_RUN_ID", max_rows=10)
print(result.summary)
print(result.rows)
```

## apivault-bilibili-popular-videos-prototype

[Hosted Actor](https://apify.com/apivault_labs/bilibili-popular-videos-prototype) | [Source](https://github.com/apivault-labs/apivault-labs/tree/8c43e5b9c7d3549801e07a5fee01f1e0952568bc/packages/apivault-bilibili-popular-videos-prototype)

```bash
git -C av -c core.longpaths=true checkout --detach 8c43e5b9c7d3549801e07a5fee01f1e0952568bc
python -m pip install "./av/packages/apivault-bilibili-popular-videos-prototype"
```

```python
from apivault_bilibili_popular_videos_prototype import Client

# Set your own APIFY_TOKEN in the environment.
# Read a successful run from your own account without starting another run.
result = Client().result("YOUR_EXISTING_RUN_ID", max_rows=10)
print(result.summary)
print(result.rows)
```

## apivault-naver-smartstore-source-probe

[Hosted Actor](https://apify.com/apivault_labs/naver-smartstore-source-probe) | [Source](https://github.com/apivault-labs/apivault-labs/tree/8c43e5b9c7d3549801e07a5fee01f1e0952568bc/packages/apivault-naver-smartstore-source-probe)

```bash
git -C av -c core.longpaths=true checkout --detach 8c43e5b9c7d3549801e07a5fee01f1e0952568bc
python -m pip install "./av/packages/apivault-naver-smartstore-source-probe"
```

```python
from apivault_naver_smartstore_source_probe import Client

# Set your own APIFY_TOKEN in the environment.
# Read a successful run from your own account without starting another run.
result = Client().result("YOUR_EXISTING_RUN_ID", max_rows=10)
print(result.summary)
print(result.rows)
```

## Costs and source limits

The Python clients have no separate subscription. Starting the hosted Actor is billed under that Actor's current pricing; configured start fees, platform usage and any proxy traffic are additional where applicable. Reading a saved run does not continue collection. Download caps do not cap collection or total resource costs. Start requests are not automatically retried. Failed/source-limited runs require reading diagnostics in Apify Console rather than assuming complete output. Review each Actor's documented coverage before starting collection.

Substack, YouTube transcripts and Bilibili have an existing Actor Start event. YouTube's configured default proxy group and Naver's Korean proxy can add traffic costs. These source installation commands do not alter the Actor code, pricing, Tasks or latest tags. n8n Cloud verification is not claimed.
