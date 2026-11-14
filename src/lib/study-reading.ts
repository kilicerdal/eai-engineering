import {v30ReadingBooks} from './reading/catalog-v30';
import {additionalReadingBooks} from './reading/catalog-v22';
export const readingBooks = [
  {id:"1342",title:"Pride and Prejudice",author:"Jane Austen",genre:"Romance",note:"Wit, first impressions, and the complicated business of knowing another person."},
  {id:"11",title:"Alice’s Adventures in Wonderland",author:"Lewis Carroll",genre:"Fantasy",note:"Follow curiosity into a world of playful language and impossible encounters."},
  {id:"1661",title:"The Adventures of Sherlock Holmes",author:"Arthur Conan Doyle",genre:"Mystery",note:"A collection of mysteries to explore one case at a time."},
  {id:"84",title:"Frankenstein",author:"Mary Shelley",genre:"Gothic",note:"A searching story of creation, responsibility, and belonging."},
  {id:"2701",title:"Moby Dick",author:"Herman Melville",genre:"Adventure",note:"An ocean voyage through obsession, uncertainty, and the natural world."},
  {id:"64317",title:"The Great Gatsby",author:"F. Scott Fitzgerald",genre:"Literary fiction",note:"An encounter with ambition, longing, and the promises of reinvention."},
  {"id": "120", "title": "Treasure Island", "author": "Robert Louis Stevenson", "genre": "Adventure", "note": "A map, a voyage, and a dangerous search for buried treasure."},
  {"id": "35", "title": "The Time Machine", "author": "H. G. Wells", "genre": "Science fiction", "note": "A journey into the distant future that asks who progress really serves."},
  {"id": "36", "title": "The War of the Worlds", "author": "H. G. Wells", "genre": "Science fiction", "note": "An unsettling encounter with an intelligence humanity cannot control."},
  {"id": "113", "title": "The Secret Garden", "author": "Frances Hodgson Burnett", "genre": "Coming of age", "note": "A locked garden becomes a place of friendship and renewal."},
  {"id": "45", "title": "Anne of Green Gables", "author": "L. M. Montgomery", "genre": "Coming of age", "note": "An imaginative young outsider finds a home and a voice."},
  {"id": "514", "title": "Little Women", "author": "Louisa May Alcott", "genre": "Coming of age", "note": "Four sisters work out what kind of lives they want to lead."},
  {"id": "1260", "title": "Jane Eyre", "author": "Charlotte Brontë", "genre": "Gothic", "note": "An independent voice navigates love, work, and moral choice."},
  {"id": "174", "title": "The Picture of Dorian Gray", "author": "Oscar Wilde", "genre": "Gothic", "note": "Beauty and conscience collide in a story about a mysterious portrait."},
  {"id": "43", "title": "The Strange Case of Dr. Jekyll and Mr. Hyde", "author": "Robert Louis Stevenson", "genre": "Gothic", "note": "A mystery turns the question of human identity inside out."},
  {"id": "46", "title": "A Christmas Carol", "author": "Charles Dickens", "genre": "Fantasy", "note": "One winter night offers a miser an unexpected second chance."},
  {"id": "844", "title": "The Importance of Being Earnest", "author": "Oscar Wilde", "genre": "Comedy", "note": "Invented identities meet sharp conversation and gloriously tangled manners."},
  {"id": "1952", "title": "The Yellow Wallpaper", "author": "Charlotte Perkins Gilman", "genre": "Gothic", "note": "A short, unsettling account of confinement and a voice struggling to be heard."},
  {"id": "205", "title": "Walden, and On the Duty of Civil Disobedience", "author": "Henry David Thoreau", "genre": "Nature & ideas", "note": "Observations of a deliberate life, followed by an essay on conscience."},
  {"id": "132", "title": "The Art of War", "author": "Sun Tzu", "genre": "Strategy", "note": "A historical text about planning, uncertainty, and strategic judgment."},
  {"id": "2680", "title": "Meditations", "author": "Marcus Aurelius", "genre": "Philosophy", "note": "An emperor’s private reflections on attention, duty, and how to live."},
  {"id": "289", "title": "The Wind in the Willows", "author": "Kenneth Grahame", "genre": "Fantasy", "note": "Friendship, home, and misadventure along a lively riverbank."},
  {"id": "55", "title": "The Wonderful Wizard of Oz", "author": "L. Frank Baum", "genre": "Fantasy", "note": "A strange road brings an unlikely group of travelers together."},
  {"id": "97", "title": "Flatland", "author": "Edwin A. Abbott", "genre": "Science fiction", "note": "A geometric fable that asks how much our viewpoint allows us to see."},
  {"id": "23", "title": "Narrative of the Life of Frederick Douglass", "author": "Frederick Douglass", "genre": "Memoir", "note": "A firsthand account of enslavement, literacy, and the pursuit of freedom."},
  ...additionalReadingBooks,...v30ReadingBooks,
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
