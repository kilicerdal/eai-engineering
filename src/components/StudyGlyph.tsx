const paths: Record<string,string> = {
  general: "M24 4L28 20L44 24L28 28L24 44L20 28L4 24L20 20Z",
  math: "M24 4L42 15V33L24 44L6 33V15ZM6 15L24 25L42 15M24 25V44M24 4V25M6 33L24 25L42 33",
  science: "M8 10C20 0 45 30 40 38C32 49 4 18 8 10ZM40 10C28 0 3 30 8 38C16 49 44 18 40 10ZM24 5C12 5 12 43 24 43C36 43 36 5 24 5Z",
  writing: "M7 8C13 6 20 8 24 12C28 8 35 6 41 8V38C34 36 28 37 24 41C20 37 14 36 7 38ZM24 12V41",
  history: "M5 17L24 5L43 17ZM8 42H40M11 20V37M20 20V37M29 20V37M38 20V37M6 38H42",
  coding: "M18 13L6 24L18 35M30 13L42 24L30 35M28 7L20 41",
  engineering: "M18 6H30L32 13L39 12L45 23L39 28L40 35L29 42L24 37L17 40L8 31L11 24L5 19L12 9L18 12Z",
};
export default function StudyGlyph({kind}:{kind:string}){return <svg viewBox="0 0 48 48" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[kind]||paths.general}/>{(kind==="engineering"||kind==="science")&&<circle cx="24" cy="24" r={kind==="science"?2:7}/>}</svg>;}
