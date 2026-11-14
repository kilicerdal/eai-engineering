import {notFound} from 'next/navigation';
import {readingBooks} from '@/lib/study-reading';
import BookReader from '@/components/BookReader';
import '../reading-room.css';
export function generateStaticParams(){return readingBooks.map(book=>({id:book.id}));}
export async function generateMetadata({params}:{params:Promise<{id:string}>}){const {id}=await params;const book=readingBooks.find(b=>b.id===id);return {title:book?`${book.title} | dAI Reading Room`:'Book not found'};}
export default async function ReaderPage({params}:{params:Promise<{id:string}>}){const {id}=await params;const book=readingBooks.find(b=>b.id===id);if(!book)notFound();return <BookReader key={book.id} book={book}/>;}
