export const readingBooks = [
  {id:"1342",title:"Pride and Prejudice",author:"Jane Austen",genre:"Romance",note:"Wit, first impressions, and the complicated business of knowing another person."},
  {id:"11",title:"Alice’s Adventures in Wonderland",author:"Lewis Carroll",genre:"Fantasy",note:"Follow curiosity into a world of playful language and impossible encounters."},
  {id:"1661",title:"The Adventures of Sherlock Holmes",author:"Arthur Conan Doyle",genre:"Mystery",note:"A collection of mysteries to explore one case at a time."},
  {id:"84",title:"Frankenstein",author:"Mary Shelley",genre:"Gothic",note:"A searching story of creation, responsibility, and belonging."},
  {id:"2701",title:"Moby Dick",author:"Herman Melville",genre:"Adventure",note:"An ocean voyage through obsession, uncertainty, and the natural world."},
  {id:"64317",title:"The Great Gatsby",author:"F. Scott Fitzgerald",genre:"Literary fiction",note:"An encounter with ambition, longing, and the promises of reinvention."},
] as const;
export const readingStatuses = ["Want to read","Reading","Finished"] as const;
export type ReadingStatus = typeof readingStatuses[number];
export const READING_KEY="dai-reading-shelf-v1";
export function readShelf(raw:string|null):Record<string,ReadingStatus>{
  if(raw===null)return {};
  const value:unknown=JSON.parse(raw);
  if(!value||typeof value!=="object"||Array.isArray(value))throw new Error("Unreadable bookshelf");
  for(const [id,status] of Object.entries(value))if(!readingBooks.some(book=>book.id===id)||!readingStatuses.includes(status as ReadingStatus))throw new Error("Unreadable bookshelf");
  return value as Record<string,ReadingStatus>;
}
