import Link from "next/link";

function ResourceArtwork({reading = false}: {reading?: boolean}) {
  return <svg viewBox="0 0 520 190" fill="none" aria-hidden="true" focusable="false">
    <defs><linearGradient id={reading?"reading-glow":"source-glow"} x1="80" y1="0" x2="440" y2="190" gradientUnits="userSpaceOnUse"><stop stopColor="#d9b979" stopOpacity=".7"/><stop offset="1" stopColor="#71a9ab" stopOpacity=".12"/></linearGradient></defs>
    {reading ? <g stroke="url(#reading-glow)"><path d="M64 154H456M64 83H456M95 29H425"/><path d="M90 150V89H112V150M121 150V97H143V150M158 150L147 94L167 90L178 150M192 150V88H225V150M244 150V100H262V150M274 150L265 92L288 89L298 150M312 150V87H345V150M361 150V100H380V150M390 150V88H418V150"/><path d="M115 79V34H140V79M152 79V41H173V79M189 79L178 36L200 31L210 79M232 79V34H263V79M278 79V45H301V79M316 79L306 32L329 28L340 79M354 79V38H385V79"/><path d="M78 18V170M442 18V170" strokeOpacity=".4"/></g> : <g stroke="url(#source-glow)"><path d="M150 34L333 16L348 154L165 172Z"/><path d="M178 23L361 39L349 175L166 159Z"/><path d="M190 42H366V176H190Z" fill="#102431"/><path d="M215 68H326M215 83H342M215 98H294M215 124H337M215 139H316M215 154H279"/><path d="M84 83H159M374 105H440M104 123H158" strokeDasharray="3 7"/><circle cx="84" cy="83" r="5"/><circle cx="440" cy="105" r="5"/><circle cx="104" cy="123" r="3"/><path d="M216 98H294" stroke="#e4c48d" strokeWidth="3"/></g>}
  </svg>;
}

export default function LearningResources() {
  return <section id="learning-resources" className="learning-resources" aria-labelledby="learning-resources-heading">
    <div className="learning-resources-inner">
      <header><div><p className="studio-eyebrow">YOUR LEARNING RESOURCES</p><h2 id="learning-resources-heading">A source to study. A world to explore.</h2></div><p>Bring something of your own,<br/>or discover something new.</p></header>
      <div className="learning-resource-grid">
        <article id="personal-library" className="learning-resource-card"><div className="learning-resource-art"><ResourceArtwork/></div><div className="learning-resource-copy"><p className="studio-eyebrow">01 / PERSONAL LIBRARY</p><h3>Your sources.<br/>A deeper understanding.</h3><p>Bring notes, chapters, and course materials into your study. Return to source passages as you learn.</p><Link href="/study/materials">Open your library <span aria-hidden="true">↗</span></Link><small>Notes · Chapters · Course materials</small></div></article>
        <article className="learning-resource-card reading-resource"><div className="learning-resource-art"><ResourceArtwork reading/></div><div className="learning-resource-copy"><p className="studio-eyebrow">02 / THE READING ROOM</p><h3>Follow a book.<br/>Discover an idea.</h3><p>Explore classics, follow your curiosity, and build a personal bookshelf you can return to.</p><Link href="/study/reading">Enter the Reading Room <span aria-hidden="true">↗</span></Link><small>Classics · Discovery · Your bookshelf</small></div></article>
      </div>
    </div>
  </section>;
}
