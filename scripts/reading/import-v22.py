# Run from the checkout: python3 scripts/reading/import-v22.py /absolute/source-cache
from pathlib import Path
import json,re,hashlib,unicodedata,html.parser,xml.etree.ElementTree as E
import sys
root=Path.cwd();cache=Path(sys.argv[1]);cur=json.loads((root/'scripts/reading/v22-curation.json').read_text());rows=json.loads((cache/'selected.json').read_text());assert len(cur)==len(rows)==75
class Heads(html.parser.HTMLParser):
 def __init__(self):super().__init__();self.level=0;self.buf=[];self.out=[]
 def handle_starttag(self,t,a):
  if re.fullmatch('h[1-6]',t):self.level+=1;self.buf=[]
 def handle_endtag(self,t):
  if re.fullmatch('h[1-6]',t) and self.level:self.out.append(' '.join(''.join(self.buf).split()));self.level-=1
 def handle_data(self,d):
  if self.level:self.buf.append(d+' ')
def norm(t):return re.sub(r'[^a-z0-9]','',unicodedata.normalize('NFKD',t).lower())
meta={};chapters={};books=[];intros={};ledger=[];review=[]
for row in rows:
 id=row['id'];c=cur[id];raw=(cache/f'{id}.txt').read_bytes();text=raw.decode('utf-8-sig').replace('\r\n','\n');assert row['rights']=='Public domain in the USA.' and row['languages']==['en'];assert 'THE FULL PROJECT GUTENBERG LICENSE' in text.upper()
 start=re.search(r'^\*\*\* START OF (?:THE|THIS) PROJECT GUTENBERG EBOOK.*?\*\*\*\s*$',text,re.M);end=re.search(r'^\*\*\* END OF (?:THE|THIS) PROJECT GUTENBERG EBOOK.*?\*\*\*\s*$',text,re.M);assert start and end,id
 body=text[start.end():end.start()].strip();blocks=[p.strip() for p in re.split(r'\n\s*\n',body) if p.strip()];paras=[dict(id=f'p{i+1}',text=p) for i,p in enumerate(blocks)];sections=[];part=[];words=0;locations={}
 for p in paras:
  n=len(p['text'].split())
  if words>=700 and part:sections.append(part);part=[];words=0
  locations[p['id']]=len(sections);part.append(p);words+=n
 if part:sections.append(part)
 h=Heads();htmlpath=cache/f'{id}.html'
 if htmlpath.exists():h.feed(htmlpath.read_text(encoding='utf-8-sig'))
 else:h.out=[p['text'] for p in paras if len(p['text'])<160 and re.match(r'^(?:Actus|ACT|Act |SCENE|Scene |CHAPTER|Chapter )',p['text'])]
 headings={norm(t):t for t in h.out if t.strip() and len(t)<500 and not re.search('gutenberg|contents|illustration|transcrib|copyright|license',t,re.I)}
 anchors=[]
 authorTokens=[norm(a) for a in row['authors']]+[norm(' '.join(reversed(a.split(', ',1)))) for a in row['authors']]
 for i,p in enumerate(paras):
  t=p['text'];n=norm(t);label=headings.get(n)
  if not label:
   for size in [2,3]:
    joined=' '.join(x['text'] for x in paras[i:i+size]);key=norm(joined)
    if len(joined)<500 and key in headings:label=headings[key];break
  if re.match(r'^(?:CHAPTER|Chapter|BOOK|Book|ACT|Act|PART|Part)\s+(?:[IVXLCDM]+|[0-9]+)\b',t) and len(t)<500:label=' '.join(t.split())
  if re.fullmatch(r'[IVXLCDM]+[.]?',t.strip()) and i+1<len(paras) and len(paras[i+1]['text'].split())>=15:label=t.strip()
  if c['genre'] in ['Poetry','Essays','Fairy tales','Stories & fables'] and t.isupper() and 2<=len(t.split())<=12 and len(t)<100:label=' '.join(t.split())
  if label and len(t)<500 and not re.search(r'^(?:by\b|translated|edited|the publisher|preface|introduction|translator|editor|dedication|footnotes|notes|appendix|biograph|bibliograph|advertisement|contents|a millennium|\[)',label,re.I) and n not in authorTokens and n not in [norm(c['title']),norm(row['title'])]:anchors.append(dict(label=label,section=locations[p['id']],paragraph=p['id']))
 # Original headings may also occur in contents. Prefer the first chapter followed by prose, not a list.
 anchors=[a for a in anchors if len(re.findall(r'CHAPTER|Chapter|BOOK |Book |Scene |SCENE ',a['label']))<=1]
 anchorIds={a['paragraph'] for a in anchors}
 main=next((a for a in anchors if re.match(r'^(?:CHAPTER|Chapter|BOOK|Book|ACT|Act)\s+(?:I[. :\n]|I$|1[. :\n]|1$)',a['label']) and any(len(p['text'].split())>=30 and p['id'] not in anchorIds and not p['text'].isupper() for p in paras[int(a['paragraph'][1:]):int(a['paragraph'][1:])+8])),None)
 floors={'11339':370,'2591':8,'503':6,'365':12,'209':5,'54':12,'1998':138,'216':7,'12242':12,'574':5,'31':12,'20203':78,'130':11,'7164':17,'58585':12,'5616':5,'408':13,'160':13,'151':5,'242':29,'145':20}
 floorOverride=floors.get(id)
 if floorOverride is not None:anchors=[a for a in anchors if int(a['paragraph'][1:])>=floorOverride]
 elif main:anchors=[a for a in anchors if int(a['paragraph'][1:])>=int(main['paragraph'][1:])]
 continuous={'1080':(5,'complete essay'),'1065':(4,'complete poem'),'1064':(3,'complete story'),'932':(3,'complete story'),'1063':(4,'complete story'),'41':(5,'complete story'),'58585':(12,'complete book')}
 if id in continuous:
  n,kind=continuous[id];anchors=[dict(label=c['title']+' · '+kind,section=locations[f'p{n}'],paragraph=f'p{n}')]
 if id=='216':anchors=[dict(label=p['text'].strip(),section=locations[p['id']],paragraph=p['id']) for p in paras if re.match(r'^PART [12]\.',p['text'])]
 if id in ['1513','1524','1514']:
  first=next((int(p['id'][1:]) for p in paras if re.fullmatch(r'ACT I[.]?',p['text'].strip())),1);anchors=[a for a in anchors if int(a['paragraph'][1:])>=first]
 # Remove duplicate headings produced by a heading spanning multiple adjacent source blocks.
 cleaned=[]
 for a in anchors:
  if cleaned and norm(cleaned[-1]['label'])==norm(a['label']) and int(a['paragraph'][1:])-int(cleaned[-1]['paragraph'][1:])<4:continue
  cleaned.append(a)
 anchors=cleaned
 if not anchors:anchors=[dict(label=c['title']+' · source text',section=0,paragraph='p1')]
 anchors.sort(key=lambda a:int(a['paragraph'][1:]));chapters[id]=anchors
 floor=int(anchors[0]['paragraph'][1:])-1
 candidates=[p for p in paras[floor:] if 8<=len(p['text'].split())<=250 and not re.search('contents|preface|gutenberg|transcrib|illustration|all rights reserved|millennium fulcrum',p['text'],re.I) and len(re.findall(r'CHAPTER|Chapter|ACT |Scene ',p['text']))<2 and not p['text'].isupper() and p['id'] not in {a['paragraph'] for a in anchors} and not re.match(r'^(?:CHAPTER|Chapter|BOOK |Book |Scene |SCENE |ACT |Act |Translated|Translation)',p['text'])]
 excerpt=candidates[0] if candidates else next((p for p in paras[floor:] if len(p['text'].split())>=8),paras[floor])
 overrides={'12242':'p30','20203':'p80','5616':'p5'}
 if id in overrides:excerpt=next(p for p in paras if p['id']==overrides[id])
 excerptText=excerpt['text'][:600];excerptText=excerptText.rsplit(' ',1)[0]+'…' if len(excerpt['text'])>600 else excerptText
 author=c.get('author') or ' & '.join(' '.join(reversed(a.split(', ',1))) for a in row['authors']);author=re.sub(r' \([^)]*\)','',author)
 data=dict(id=id,revision='2026-11-14',source=f'https://www.gutenberg.org/ebooks/{id}',sha256=hashlib.sha256(raw).hexdigest(),rights='Public domain in the USA; copyright may differ elsewhere.',sections=sections)
 (root/f'public/reading/{id}.txt').write_bytes(raw);(root/f'public/reading/{id}.json').write_text(json.dumps(data,ensure_ascii=False,separators=(',',':')))
 meta[id]=dict(words=len(body.split()),sections=len(sections),excerpt=excerptText,excerptParagraph=excerpt['id'],excerptSection=locations[excerpt['id']],sourceTitle=row['title'],sha256=data['sha256'],moods=c['moods'],why=c['note']+' Read for the questions the language and viewpoint leave with you.',motif=['✧','◇','◌','❧','⌘'][len(books)%5],paragraphs=len(paras),excerptKind='passage',startSection=anchors[0]['section'],startParagraph=anchors[0]['paragraph'])
 books.append(dict(id=id,title=c['title'],author=author,genre=c['genre'],note=c['note']))
 guidance={'Poetry':'Read a little aloud. Line breaks, rhythm, and repetition carry meaning; the source edition may include notes and introductory material.','Drama':'Character names and stage directions guide the action. This is a play, so read speech as performance rather than continuous narration.','Epic':'This is an English translation of an ancient epic. The translator’s style and historical conventions shape the voice you hear.','Philosophy':'Read a short passage at a time. Historical arguments and translated terminology invite questioning rather than automatic agreement.','Fairy tales':'Each tale can be read separately. Traditional stories may include violence and attitudes that differ from modern retellings.','Stories & fables':'Try one piece at a time. A narrator’s stated lesson is an invitation to think, not a rule you must accept.','Short fiction':'Small details and changes of voice matter. Read slowly enough to notice what the narrator leaves uncertain.','Essays':'You can read an essay at a time. These historical voices make arguments that can be questioned as well as appreciated.'}.get(c['genre'],'Historical wording and attitudes are retained. Let the narrator’s voice set the pace, and use the source notes when a reference is unfamiliar.')
 intros[id]=dict(era='Historical '+c['genre'].lower()+' · English-language edition.',invitation=c['note'],language=guidance,source=data['source'])
 ledger.append({**row,'sha256':data['sha256'],'checked':'2026-11-14','chapterAnchors':len(anchors),'excerpt':excerpt['id']})
 review.append(f"{id} | {c['title']} | {len(anchors)} anchors | {anchors[0]['paragraph']} {anchors[0]['label']} | excerpt {excerpt['id']}: {' '.join(excerpt['text'].split())[:160]}")
(root/'src/lib/reading/catalog-v22.ts').write_text('export const additionalReadingBooks='+json.dumps(books,ensure_ascii=False,indent=2)+' as const;\n')
(root/'src/lib/reading/editions-v22.ts').write_text('export const additionalReadingEditions='+json.dumps(meta,ensure_ascii=False,indent=2)+' as const;\n')
(root/'src/lib/reading/contents-v22.ts').write_text('export const additionalReadingChapters='+json.dumps(chapters,ensure_ascii=False,indent=2)+';\n')
(root/'src/lib/reading/introductions-v22.ts').write_text('export const additionalReadingIntroductions='+json.dumps(intros,ensure_ascii=False,indent=2)+';\n')
(root/'docs/reading-sources-v22.json').write_text(json.dumps(ledger,ensure_ascii=False,indent=2));(cache/'review.txt').write_text('\n'.join(review));print('\n'.join(review))
