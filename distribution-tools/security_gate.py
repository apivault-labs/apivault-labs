"""Inspect public connector sources and archives without printing matched values."""
import json,re,sys,tarfile,zipfile
from pathlib import Path
PATTERNS={
 'credential':re.compile(r'(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,}|npm_[A-Za-z0-9]{30,}|pypi-[A-Za-z0-9_-]{30,}|apify_api_[A-Za-z0-9]{20,})'),
 'private_key':re.compile(r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----'),
 'server_implementation':re.compile(r'BeautifulSoup\(|playwright\.|selenium\.|query_selector\('),
}
def check(name,data):
    p=Path(name)
    if p.name in ['.env','.npmrc','.pypirc','Dockerfile'] or '.actor' in p.parts or p.suffix in ['.db','.pem','.key','.pyc']:
        return [(name,'forbidden_file')]
    text=data.decode('utf-8',errors='replace')
    return [(name,rule) for rule,rx in PATTERNS.items() if rx.search(text)]
def inspect(path):
    findings=[]
    if path.is_dir():
        for p in path.rglob('*'):
            if p.is_file() and not any(part in ['node_modules','dist','build','__pycache__','.git'] or part.endswith('.egg-info') for part in p.relative_to(path).parts) and not p.name.endswith(('.tgz','.whl','.tar.gz')):
                findings.extend(check(str(p.relative_to(path)),p.read_bytes()))
    elif path.suffix=='.whl':
        with zipfile.ZipFile(path) as z:
            for name in z.namelist():
                if not name.endswith('/'):findings.extend(check(name,z.read(name)))
    else:
        with tarfile.open(path) as t:
            for member in t.getmembers():
                if member.isfile():findings.extend(check(member.name,t.extractfile(member).read()))
                elif member.issym() or member.islnk():findings.append((member.name,'archive_link'))
    return findings
if __name__=='__main__':
    errors=[]
    for name in sys.argv[1:]:errors.extend(inspect(Path(name)))
    if errors:print(json.dumps(errors));raise SystemExit(1)
    print('PUBLIC_CONNECTOR_GATE_PASS')
