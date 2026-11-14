'use client';
import {useMemo} from 'react';
import {readingChapters} from '@/lib/reading/navigation';
import {estimateLength,type BookId,type Position} from '@/lib/reading/library';
import {chapterRemaining} from '@/lib/reading/returning';
import type {ReadingParagraph} from '@/lib/reading/session';
export default function ReadingPlace({id,sections,place}:{id:BookId;sections:ReadingParagraph[][];place:Pick<Position,'section'|'paragraph'>}){const {section,paragraph}=place;const remaining=useMemo(()=>chapterRemaining(sections,readingChapters[id],{section,paragraph}),[id,sections,section,paragraph]);return <section className="rr-chapter-place" aria-label="Your place in the book"><p className="rr-eyebrow">YOUR PLACE</p>{remaining?<><h3>{remaining.label}</h3><p>About {estimateLength(remaining.words)} of reading from your current paragraph {remaining.nextLabel?'to the next contents heading':'to the end of this edition'}.</p><small>An estimate at 200–250 words a minute. Take your time; there is no countdown.</small></>:<p>Your saved place is kept. A chapter estimate is unavailable at this position.</p>}</section>;}
