"""Read-only public source checks; HTTP availability is not editorial verification."""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
import json,urllib.request,re,hashlib
class Text(HTMLParser):
 def __init__(self):super().__init__();self.skip=0;self.out=[]
 def handle_starttag(self,t,a):
  if t in ('script','style','noscript'):self.skip+=1
 def handle_endtag(self,t):
  if t in ('script','style','noscript'):self.skip=max(0,self.skip-1)
 def handle_data(self,t):
  if not self.skip and t.strip():self.out.append(t.strip())
urls={}
for p in Path('data/art/editorial-v2').rglob('*.md'):
 for line in p.read_text().splitlines():
  if line.startswith('@source '):
   title,url,*_=line[8:].split('|');urls.setdefault(url.strip(),[]).append(str(p))
cache=Path('tmp/art-editorial-sources');cache.mkdir(parents=True,exist_ok=True)
def fetch(item):
 url,files=item;key=hashlib.sha256(url.encode()).hexdigest()[:16];dest=cache/(key+'.json')
 if dest.exists():return json.loads(dest.read_text())
 row={'url':url,'usedBy':files}
 try:
  req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0 (compatible; eAI editorial reference review)'})
  with urllib.request.urlopen(req,timeout=20) as r:
   raw=r.read(3000000).decode('utf-8','replace');parser=Text();parser.feed(raw)
   row.update(status=r.status,finalUrl=r.url,title=(re.search(r'<title[^>]*>(.*?)</title>',raw,re.S|re.I).group(1) if re.search(r'<title',raw,re.I) else ''),text='\n'.join(parser.out))
 except Exception as e:row['error']=str(e)[:300]
 dest.write_text(json.dumps(row,ensure_ascii=False,indent=2));return row
with ThreadPoolExecutor(max_workers=6) as pool:rows=list(pool.map(fetch,urls.items()))
Path('tmp/art-editorial-source-check.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2));print(json.dumps([{'url':r['url'],'status':r.get('status'), 'error':r.get('error')}for r in rows],indent=2))
