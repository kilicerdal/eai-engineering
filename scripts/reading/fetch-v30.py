from pathlib import Path
import urllib.request,json,xml.etree.ElementTree as E,time,concurrent.futures
root=Path.cwd();cache=Path('/private/tmp/reading-v30-sources');cache.mkdir(exist_ok=True)
baseline=root/'tests/fixtures/reading-v29-baseline.json'
existing={b['id'] for b in json.loads(baseline.read_text())['books']} if baseline.exists() else {p.stem for p in (root/'public/reading').glob('*.txt')}
ns={'d':'http://purl.org/dc/terms/','p':'http://www.gutenberg.org/2009/pgterms/','r':'http://www.w3.org/1999/02/22-rdf-syntax-ns#'}
candidates=[]
for line in (root/'scripts/reading/v30-candidates.tsv').read_text().splitlines():
 id,genre,title,note=line.split('|',3)
 if id not in existing:candidates.append(dict(id=id,genre=genre,title=title,note=note))
def fetch(c):
 id=c['id']
 try:
  path=cache/f'{id}.rdf'
  if not path.exists():path.write_bytes(urllib.request.urlopen(f'https://www.gutenberg.org/ebooks/{id}.rdf',timeout=45).read())
  b=E.fromstring(path.read_bytes()).find('p:ebook',ns)
  row={**c,'sourceTitle':b.find('d:title',ns).text,'authors':[x.text for x in b.findall('d:creator/p:agent/p:name',ns)],'rights':b.find('d:rights',ns).text,'languages':[x.text for x in b.findall('d:language/r:Description/r:value',ns)]}
  if row['rights']!='Public domain in the USA.' or row['languages']!=['en']:raise ValueError('Rights/language not eligible')
  urls=[x.attrib.get('{'+ns['r']+'}about','') for x in b.findall('d:hasFormat/p:file',ns)]
  url=next((u for u in urls if u.endswith('.txt.utf-8')),None) or f'https://www.gutenberg.org/ebooks/{id}.txt.utf-8'
  text=cache/f'{id}.txt'
  if not text.exists():text.write_bytes(urllib.request.urlopen(url,timeout=90).read())
  row['url']=url;row['bytes']=text.stat().st_size
  print(id,row['sourceTitle'],flush=True);return row
 except Exception as e:print('FAILED',id,str(e),flush=True);return None
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:rows=[r for r in pool.map(fetch,candidates) if r]
(cache/'candidates.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2));print('ELIGIBLE',len(rows),flush=True)
