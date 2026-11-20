"""Build the curated client catalog from reviewed records and local image metadata."""
import json,pathlib,re,html
ROOT=pathlib.Path(__file__).resolve().parents[2]
rows=json.loads((ROOT/'data/art/research.json').read_text());images=json.loads((ROOT/'data/art/images.json').read_text())
editorial={}
for line in (ROOT/'data/art/editorial.txt').read_text().splitlines():
 artist,index,story,how,details,question=line.split('|');editorial[(artist,int(index))]={'story':story,'how':how,'details':details.split(';'),'question':question}
dates={
'leonardo':['c. 1503–1517','c. 1495–1498','1489–1491','1483–1486','c. 1472–1476','c. 1474–1478','1513–1516'],
'michelangelo':['c. 1507','c. 1512','1536–1541','c. 1512'],
'raphael':['1509–1511','c. 1513–1514','1516–1520','1504','1506','c. 1514–1515','c. 1512'],
'caravaggio':['1599–1600','1601','c. 1596','c. 1599–1602','c. 1602','1602–1604','c. 1599'],
'rembrandt':['1642','1632','c. 1665–1669','c. 1668–1669','1633','1662','c. 1635–1638'],
'vermeer':['c. 1665','c. 1657–1658','c. 1660–1661','c. 1666–1668','c. 1662–1663','c. 1669–1670','c. 1657–1659'],
'gentileschi':['c. 1620','1638–1639','1610','c. 1623–1625','c. 1615–1617','c. 1627'],
'goya':['1814','1814','c. 1820–1823','c. 1819–1823','1800–1801','1777','c. 1800–1805'],
 'turner':['1839','1844','1840','1842','c. 1845','1835','1815'],
'monet':['1872','1875','1868–1869','1877','1899','1908–1912','1866–1867'],
'morisot':['1872','1879','1869','1873','1876','1886','1875'],
'van-gogh':['1889','1885','1888','1888','1888','1889','1890'],
'cezanne':['c. 1893','c. 1894–1895','c. 1898–1905','1888–1890','c. 1887','c. 1894','1873'],
'cassatt':['1893','1878','1893–1894','1878','1900','1897','c. 1894'],
'kandinsky':['1913','1923','1925','1926','1903','1923']}
era={**dict.fromkeys(['leonardo','michelangelo','raphael'],'renaissance'),**dict.fromkeys(['caravaggio','rembrandt','vermeer','gentileschi'],'baroque'),**dict.fromkeys(['goya','turner'],'romanticism'),**dict.fromkeys(['monet','morisot','cassatt'],'impressionism'),**dict.fromkeys(['van-gogh','cezanne'],'post-impressionism'),'kandinsky':'abstraction'}
locationFix={('gentileschi',1):'Royal Collection, United Kingdom',('gentileschi',3):'Detroit Institute of Arts',('gentileschi',4):'National Gallery, London',('turner',5):'Cleveland Museum of Art',('monet',6):"Musée d’Orsay, Paris",('morisot',0):"Musée d’Orsay, Paris",('morisot',2):'National Gallery of Art, Washington',('morisot',4):'Thyssen-Bornemisza National Museum, Madrid',('morisot',5):'National Gallery of Art, Washington',('rembrandt',6):'National Gallery, London',('cezanne',4):'The Courtauld, London'}
nameFix={('leonardo',3):'Virgin of the Rocks · Louvre version',('michelangelo',3):'Separation of Light from Darkness',('raphael',2):'The Transfiguration',('raphael',4):'Madonna of the Goldfinch',('raphael',6):'The Triumph of Galatea',('caravaggio',1):'Supper at Emmaus · London version',('rembrandt',5):'The Sampling Officials',('gentileschi',0):'Judith Slaying Holofernes · Florence version',('gentileschi',3):'Judith and Her Maidservant · Detroit version',('goya',6):'The Clothed Maja',('monet',3):'The Saint-Lazare Station · Orsay version',('van-gogh',2):'The Bedroom · Amsterdam version',('cezanne',1):'The Card Players · Orsay version',('cezanne',2):'The Large Bathers · Philadelphia version',('cezanne',4):'Mont Sainte-Victoire with Large Pine',('kandinsky',5):'On White II'}
name={'leonardo':'Leonardo da Vinci','michelangelo':'Michelangelo','raphael':'Raphael','caravaggio':'Caravaggio','rembrandt':'Rembrandt van Rijn','vermeer':'Johannes Vermeer','gentileschi':'Artemisia Gentileschi','goya':'Francisco de Goya','turner':'J. M. W. Turner','monet':'Claude Monet','morisot':'Berthe Morisot','van-gogh':'Vincent van Gogh','cezanne':'Paul Cézanne','cassatt':'Mary Cassatt','kandinsky':'Wassily Kandinsky'}
def clean(v):
 v=re.sub(r'<!--.*?-->','',v,flags=re.S);v=re.sub(r'\[\[([^\]|]+)\|([^\]]+)\]\]',r'\2',v);v=re.sub(r'\[\[([^\]]+)\]\]',r'\1',v);v=re.sub(r'<[^>]+>','',v);v=html.unescape(v).replace("''",'');return v.strip()
allowed=('louvre.fr','nationalgallery.org.uk','nga.gov','rijksmuseum.nl','mauritshuis.nl','uffizi.it','museodelprado.es','moma.org','clevelandart.org','vangoghmuseum.nl','guggenheim.org','courtauld.ac.uk','getty.edu','metmuseum.org','dia.org','mfa.org','musee-orsay.fr','huntington.org','centrepompidou.fr','vatican.va','museivaticani.va','philamuseum.org','philamuseum.org','penn.museum','krollermuller.nl','museothyssen.org','nationalmuseumcardiff.org.uk','museum.wales','royalcollection.org.uk','rct.uk','cenacolovinciano.org')
output=[]
for row in rows:
 a,i=row['artist'],row['index'];key=(a,i);im=next(x for x in images if x['artist']==a and x['index']==i);fields=row.get('fields',{})
 title=nameFix.get(key,clean(fields.get('title','')) or re.sub(r' \([^)]*\)$','',row['title']))
 if len(title)>110 or '|' in title:title=nameFix.get(key,re.sub(r' \([^)]*\)$','',row['title']))
 location=locationFix.get(key,clean(fields.get('museum') or fields.get('owner') or ''))
 if '|' in location or '{{' in location or not location:raise ValueError(('Review collection',key,location))
 medium=clean(fields.get('medium',''))
 if not medium or '{{' in medium or '|' in medium:medium='Oil on canvas'
 if a=='michelangelo' and i>0:medium='Fresco'
 h,w=clean(fields.get('height_metric','')),clean(fields.get('width_metric',''));dimensions=(h+' × '+w+' cm') if re.fullmatch(r'\d+(?:\.\d+)?',h) and re.fullmatch(r'\d+(?:\.\d+)?',w) else ''
 if key==('vermeer',1):title='The Milkmaid'
 sources=[{'title':'Reference record · '+title,'url':row['referenceUrl']}]
 for url in row.get('externalLinks',[]):
  if any(re.search(r'https?://(?:[^/]+\.)?'+re.escape(domain)+r'(?:/|$)',url) for domain in allowed) and not any(t in url for t in ['web.archive','upload.wikimedia','.jpg','.png','.pdf']):
   url=html.unescape(url)
   if url not in [s['url'] for s in sources]:sources.append({'title':'Museum / collection reference','url':url})
   if len(sources)>=3:break
 contentNote=''
 if key in [('caravaggio',3),('gentileschi',0),('gentileschi',3),('gentileschi',5),('goya',0),('goya',1),('goya',2),('turner',2)]:contentNote='This historical work depicts or refers to violence, death or human suffering.'
 elif key in [('michelangelo',0),('michelangelo',1),('michelangelo',2),('michelangelo',3),('caravaggio',4),('caravaggio',5),('gentileschi',2),('cezanne',2)]:contentNote='This historical work includes nudity or religious imagery; its context is discussed in the introduction.'
 im['licenseUrl']=im['licenseUrl'].replace('http://','https://',1)
 for source in sources:source['url']=source['url'].replace('http://','https://',1).rstrip('\"')
 output.append({**im,'title':title,'date':dates[a][i],'era':era[a],'medium':medium,'location':location,'dimensions':dimensions,'credit':'Digital reproduction via Wikimedia Commons · '+name[a],'alt':title+' by '+name[a]+'. '+editorial[key]['details'][0],'sources':sources,'checked':'2026-11-19','contentNote':contentNote,**editorial[key]})
assert len(output)==100 and len({p['id'] for p in output})==100
(ROOT/'data/art/paintings.json').write_text(json.dumps(output,ensure_ascii=False,indent=2)+'\n')
print('Built',len(output),'painting records')
