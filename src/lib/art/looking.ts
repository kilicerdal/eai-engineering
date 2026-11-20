import {artPaintings,type ArtPainting} from './collection';
import {artArtists} from './artists';
export const artThemes=['Faces','Light','Nature','Power','Daily life','Experiment'] as const;
export type ArtTheme=typeof artThemes[number];
export const artMoods=['Peaceful','Dramatic','Mysterious','Joyful','Reflective'] as const;
export const themeWorks:Record<ArtTheme,string[]>={
 Faces:['leonardo-01','leonardo-03','leonardo-06','raphael-06','vermeer-01','goya-05','gentileschi-02','gentileschi-05'],
 Light:['leonardo-07','caravaggio-01','caravaggio-02','vermeer-02','vermeer-05','monet-01','monet-03','monet-04','turner-05','van-gogh-04'],
 Nature:['monet-03','monet-05','monet-06','morisot-03','van-gogh-01','van-gogh-06','van-gogh-07','cezanne-05','turner-04','turner-05'],
 Power:['raphael-01','michelangelo-03','rembrandt-01','rembrandt-02','goya-01','goya-02','goya-05','gentileschi-01','caravaggio-04'],
 'Daily life':['vermeer-02','vermeer-06','vermeer-07','morisot-01','morisot-04','morisot-06','cassatt-01','cassatt-02','cassatt-04','cassatt-05','van-gogh-02','cezanne-02'],
 Experiment:['leonardo-01','michelangelo-02','turner-02','monet-01','monet-04','van-gogh-03','cezanne-01','cezanne-06','kandinsky-01','kandinsky-02','kandinsky-03','kandinsky-04']
};
const moodWorks:Record<typeof artMoods[number],string[]>={Peaceful:['monet-03','monet-05','vermeer-02','vermeer-06','morisot-01','cassatt-05','turner-05'],Dramatic:['caravaggio-01','rembrandt-05','turner-04','goya-01','gentileschi-01','michelangelo-03'],Mysterious:['leonardo-01','leonardo-07','vermeer-01','goya-04','van-gogh-01','kandinsky-04'],Joyful:['goya-06','monet-02','morisot-02','cassatt-07','kandinsky-03'],Reflective:['raphael-06','rembrandt-03','rembrandt-04','morisot-04','cezanne-02','van-gogh-03']};
export function inMood(id:string,mood:string){return !mood||mood==='all'||(moodWorks[mood as keyof typeof moodWorks]??[]).includes(id);}
export type ArtTour={id:string;title:string;intro:string;ids:string[];prompts:string[]};
export const artTours:ArtTour[]=[
{id:'light',title:'Follow the light',intro:'From a window to an atmosphere: five ways light organizes attention.',ids:['caravaggio-01','vermeer-02','turner-05','monet-01','van-gogh-04'],prompts:['Where does the light first take you?','What does light make solid?','Can light nearly replace the subject?','Where does a reflection become a mark?','How does night become colorful?']},
{id:'faces',title:'A face is a conversation',intro:'Look at a gaze, a gesture and the distance between people.',ids:['leonardo-01','raphael-06','vermeer-01','rembrandt-03','gentileschi-05'],prompts:['What changes when you look away from the smile?','What creates a sense of reserve?','Is this an encounter or a character study?','How do hands carry feeling?','What does the pose suggest about agency?']},
{id:'nature',title:'Nature, seen differently',intro:'A landscape can be an observation, a structure or an emotional space.',ids:['monet-03','turner-05','cezanne-05','van-gogh-07','monet-05'],prompts:['Where are the colored shadows?','What remains recognizable?','How do branches frame a mountain?','What creates movement without a figure?','Where does reflection complicate depth?']},
{id:'power',title:'Images of power',intro:'Public authority, private agency and the people who pay its costs. Some works depict violence.',ids:['raphael-01','rembrandt-01','goya-05','gentileschi-01','goya-01'],prompts:['Who occupies the center?','How does a group become an action?','What do clothing and placement communicate?','Whose action drives the story?','Where does the image place your sympathy?']},
{id:'daily-life',title:'The extraordinary ordinary',intro:'Work, care and quiet attention are enough for a painting.',ids:['vermeer-02','morisot-01','cassatt-01','van-gogh-02','cezanne-02'],prompts:['How is a tiny action made important?','What separates one person from another?','How does a high viewpoint change intimacy?','What do hands tell you about work?','How does repetition make a stable arrangement?']},
{id:'experiment',title:'Breaking the rules',intro:'Follow changes in the way a painting constructs its world.',ids:['leonardo-01','turner-02','van-gogh-03','cezanne-01','kandinsky-02'],prompts:['Where does an edge dissolve?','What does speed do to the scene?','Does the room feel geometrically secure?','Which edges refuse to agree?','Can a composition work without a named scene?']},
{id:'five-minutes',title:'Five minutes, three paintings',intro:'One face, one place, one experiment. About five minutes is an invitation, not a timer.',ids:['leonardo-01','monet-03','kandinsky-02'],prompts:['Notice one edge.','Notice one shadow.','Notice one relationship between shapes.']},
{id:'care',title:'Three moments of care',intro:'A short, gentle visit through attention and companionship.',ids:['morisot-01','cassatt-05','rembrandt-03'],prompts:['Follow a gaze.','Follow a hand.','Follow the space between two people.']}
];
export function yearOf(p:ArtPainting){return Number(p.date.match(/\d{4}/)?.[0]??0);}
export function orderedWorks(artist:string){return artPaintings.filter(p=>p.artist===artist).sort((a,b)=>yearOf(a)-yearOf(b)||a.id.localeCompare(b.id));}
export function relatedWorks(p:ArtPainting){const theme=artThemes.find(t=>themeWorks[t].includes(p.id));const candidates=artPaintings.filter(x=>x.id!==p.id&&(theme?themeWorks[theme].includes(x.id):x.artist===p.artist));return candidates.sort((a,b)=>Number(b.era!==p.era)-Number(a.era!==p.era)).slice(0,3).map(work=>({work,reason:theme?`Another approach to ${theme.toLowerCase()}${work.era!==p.era?' in a different era':''}.`:`Another work by ${artArtists.find(a=>a.id===p.artist)!.name}; compare the handling and arrangement.`}));}
export const comparisonPairs=[{ids:['leonardo-01','vermeer-01'],question:'How do a direct gaze and a turned head change your sense of an encounter?'},{ids:['vermeer-02','cassatt-01'],question:'How do viewpoint and light make ordinary actions feel important?'},{ids:['turner-05','monet-01'],question:'What must remain visible for atmosphere to become a landscape?'},{ids:['cezanne-01','kandinsky-02'],question:'How do forms create balance when realistic space becomes less secure?'}];
export type Marker={x:number;y:number};
// Coordinates are percentages of the actual, uncropped image, not of a cover-sized container.
export const lookingMarkers:Record<string,Marker[]>={
 'leonardo-01':[{x:46,y:83},{x:46,y:32},{x:85,y:34}],
 'michelangelo-02':[{x:38,y:43},{x:15,y:63},{x:68,y:43}],
 'vermeer-01':[{x:38,y:53},{x:48,y:65},{x:46,y:29}],
 'vermeer-02':[{x:34,y:60},{x:22,y:69},{x:87,y:18}],
 'monet-01':[{x:61,y:45},{x:48,y:74},{x:28,y:39}],
 'monet-03':[{x:20,y:47},{x:33,y:76},{x:86,y:37}],
 'van-gogh-01':[{x:17,y:50},{x:47,y:26},{x:67,y:88}],
 'cezanne-01':[{x:13,y:33},{x:45,y:76},{x:67,y:57}]
};
export const glossary=[
 {term:'Composition',text:'How shapes, spaces, colors and figures are arranged within a picture.',eras:['all']},
 {term:'Perspective',text:'A way of representing spatial relationships on a flat surface. Linear perspective can make parallel edges appear to converge.',eras:['renaissance','post-impressionism']},
 {term:'Sfumato',text:'Soft transitions between tones, with edges that can be hard to locate. Look at Leonardo’s faces.',eras:['renaissance']},
 {term:'Chiaroscuro',text:'The modeling or organization of a picture through light and dark. It is not a signature that proves an attribution.',eras:['baroque']},
 {term:'Brushwork',text:'The visible handling of paint: a mark can describe something and remain a mark at the same time.',eras:['impressionism','post-impressionism','romanticism']},
 {term:'Abstraction',text:'An approach in which shape, color and rhythm can matter without having to describe a recognizable object.',eras:['abstraction']},
 {term:'Fresco',text:'Painting with pigments on wet plaster. The wall and the working process are part of the work.',eras:['renaissance']}
];
export const originalSettings:Record<string,string>={
 'leonardo-02':'Made for the refectory of Santa Maria delle Grazie in Milan: a communal dining space, not a movable canvas.',
 'michelangelo-02':'Part of the Sistine Chapel ceiling in the Vatican. The image belongs to a much larger architectural and narrative program.',
 'michelangelo-03':'Painted on the altar wall of the Sistine Chapel, decades after the ceiling.',
 'michelangelo-04':'Part of the Sistine Chapel ceiling, where the scene is experienced from below.',
 'raphael-01':'Made for the Stanza della Segnatura in the Vatican, within a program connecting branches of knowledge.',
 'raphael-07':'Painted for the Villa Farnesina in Rome, within a private villa’s mythological decoration.',
 'caravaggio-01':'Made for the Contarelli Chapel in San Luigi dei Francesi, Rome. Its lighting and scale belong to a chapel encounter.',
 'rembrandt-01':'A civic militia group portrait commissioned for a company of Amsterdam’s civic guards; the modern title can mislead about the time of day.',
 'goya-03':'Originally painted on a wall in Goya’s house, the Quinta del Sordo, before its later transfer to canvas.',
 'goya-04':'One of the paintings made on walls at Goya’s Quinta del Sordo, later transferred to canvas.'
};
export const debated:Record<string,string>={
 'leonardo-01':'The sitter is traditionally identified as Lisa del Giocondo. Descriptions of her exact feeling are interpretations, not something the image can prove.',
 'rembrandt-03':'The traditional title The Jewish Bride does not settle who the sitters are or exactly what relationship the scene represents.',
 'vermeer-01':'This is generally understood as a tronie, a character or expression study, rather than an identified sitter’s commissioned portrait.',
 'van-gogh-07':'It is often described as Van Gogh’s last painting, but that claim is not established. Do not read the crows as proof of a single intended message.',
 'goya-04':'The sparse composition invites conflicting readings. A moving interpretation is not documentation of Goya’s intention.'
};
export const futureConnections:Record<string,string>={
 renaissance:'A modern connection: perspective and anatomical observation still inform drawing, architectural visualization and digital character design. This is a comparison of methods, not a claim that the painter predicted today’s tools.',
 baroque:'A modern connection: directed lighting and the placement of a viewer still shape photography, cinema and interface emphasis. Compare where attention lands first.',
 romanticism:'A modern connection: atmospheric images still shape how we picture technology and environmental change. Ask what the image makes impressive, and what it makes vulnerable.',
 impressionism:'A modern connection: cropping and a momentary viewpoint connect naturally with photography and moving images. Compare the experience rather than assuming a direct line of influence.',
 'post-impressionism':'A modern connection: constructed color and deliberate spatial distortion offer useful comparisons with illustration, animation and digital scene design.',
 abstraction:'A modern connection: relationships between shapes, colors and rhythm can inform visual communication and generative graphics. The analogy does not turn a historical painting into a technology demo.'
};
export function scaleInCm(p:ArtPainting){const m=p.dimensions.match(/([\d.]+)\s*[×x]\s*([\d.]+)\s*cm/i);if(!m)return null;const height=Number(m[1]),width=Number(m[2]);return height>0&&width>0&&height<5000&&width<5000?{height,width}:null;}
