from pathlib import Path
import json,re
root=Path.cwd();meta=json.loads(Path('/private/tmp/reading-v30-metadata.json').read_text());early={};notes={}
content={
 '23':('Contains firsthand accounts of enslavement and racist violence.',r'whipp'),
 '11030':('Contains firsthand accounts of enslavement, sexual coercion and family separation.',r'whisper.*foul'),
 '2376':('Contains firsthand accounts of enslavement and racial oppression.',r'I was born a slave'),
 '84':('Contains violence, death, abandonment and grief.',r'murder'),
 '345':('Contains supernatural horror, violence and blood imagery.',r'(?:mouth|lips).{0,90}blood|blood.{0,90}(?:mouth|lips)'),
 '2554':('Contains murder, psychological distress and discussions of suffering.',r'murder'),
 '1531':('Contains racist language, coercive relationships and domestic violence.',r'strangle'),
 '1515':('Contains antisemitic language and persecution within its historical dramatic setting.',r'misbeliever'),
 '71865':('Contains war-related distress, death and suicide.',r'killed himself'),
 '1952':('Contains psychological distress and restrictive care within a historical setting.',r'nervous'),
 '1399':('Contains difficult relationships, death and suicide.',r'suicide')}
for b in meta['books']:
 id=b['id'];info=meta['editions'][id];data=json.loads((root/f'public/reading/{id}.json').read_text());ps=[dict(**p,section=i) for i,s in enumerate(data['sections']) for p in s];start=next((i for i,p in enumerate(ps) if p['id']==info['excerptParagraph']),0);nexthead=next((int(c['paragraph'][1:]) for c in meta['chapters'][id] if int(c['paragraph'][1:])>int(info['excerptParagraph'][1:])),10**9)
 candidate=next((p for p in ps[start+1:start+35] if int(p['id'][1:])<nexthead and 20<=len(p['text'].split())<=220 and not p['text'].isupper() and not re.search(r'copyright|gutenberg|transcrib|contents|illustration',p['text'],re.I)),None)
 early[id]=dict(section=candidate['section'],paragraph=candidate['id'],text=candidate['text'][:1100]+('…' if len(candidate['text'])>1100 else '')) if candidate else None
 if id in content:
  text,pattern=content[id];p=next((p for p in ps if re.search(pattern,p['text'].replace('\n',' '),re.I)),None)
  if p:notes[id]=dict(text=text,section=p['section'],paragraph=p['id']);print(id,p['id'],p['text'].replace('\n',' ')[:180])
out='// Early passages and limited editorial content notes point to the unchanged primary-source paragraphs. Unreviewed titles are labelled in the UI.\nexport const earlyPassages='+json.dumps(early,ensure_ascii=False,indent=2)+' as const;\nexport const contentNotes:Partial<Record<keyof typeof earlyPassages,{text:string;section:number;paragraph:string}>>='+json.dumps(notes,ensure_ascii=False,indent=2)+';\n'
(root/'src/lib/reading/guides-v30.ts').write_text(out)
