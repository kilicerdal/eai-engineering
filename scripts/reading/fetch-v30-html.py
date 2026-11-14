from pathlib import Path
import json,xml.etree.ElementTree as E,urllib.request,concurrent.futures
cache=Path('/private/tmp/reading-v30-sources');rows=json.loads((cache/'selected.json').read_text());ns={'d':'http://purl.org/dc/terms/','p':'http://www.gutenberg.org/2009/pgterms/','r':'http://www.w3.org/1999/02/22-rdf-syntax-ns#'}
def fetch(row):
 id=row['id'];path=cache/f'{id}.html'
 try:
  if not path.exists():
   b=E.fromstring((cache/f'{id}.rdf').read_bytes()).find('p:ebook',ns);urls=[x.attrib.get('{'+ns['r']+'}about','') for x in b.findall('d:hasFormat/p:file',ns)];url=next((u for u in urls if u.endswith('.html.images')),None) or next((u for u in urls if u.endswith('.html')),None)
   if not url:return
   path.write_bytes(urllib.request.urlopen(url,timeout=90).read())
  print(id,'HTML ready',flush=True)
 except Exception as e:print('FAILED',id,str(e),flush=True)
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:list(pool.map(fetch,rows))
