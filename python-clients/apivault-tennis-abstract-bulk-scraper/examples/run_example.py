"""Run one bounded example; export actual rows and optional training records."""
import csv
import json
import sys
from pathlib import Path
from apivault_tennis_abstract_bulk_scraper import Client

name = sys.argv[1] if len(sys.argv) > 1 else 'player-history'
if name not in ('player-history', 'head-to-head', 'model-dataset'):
    raise SystemExit('Choose player-history, head-to-head or model-dataset')
payload = json.loads((Path(__file__).parent / (name + '.json')).read_text())
client = Client()
result = client.run(payload, max_total_charge_usd=0.05, max_rows=10)
Path(name + '-rows.json').write_text(json.dumps(result.rows, indent=2), encoding='utf-8')
keys = sorted({k for row in result.rows for k in row})
with Path(name + '-rows.csv').open('w', newline='', encoding='utf-8') as stream:
    writer = csv.DictWriter(stream, fieldnames=keys)
    writer.writeheader()
    writer.writerows({k: json.dumps(v) if isinstance(v, (dict, list)) else v for k, v in row.items()} for row in result.rows)
if name == 'model-dataset':
    Path(name + '-training.json').write_text(json.dumps(client.record(result.run_id, 'MODEL_DATASET'), indent=2), encoding='utf-8')
print(result.run_id, len(result.rows), result.summary)
