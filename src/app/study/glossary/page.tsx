import type { Metadata } from 'next';
import StudyGlossary from '@/components/StudyGlossary';
import StudyNavigation from '@/components/StudyNavigation';

export const metadata: Metadata = {
  title: 'Key Terms | dAI Learning Studio',
  description: 'Definitions for recurring terms across art, reading, discoveries, awards and study.',
};

export default function Page() {
  return <main className="study-glossary-shell"><StudyNavigation /><StudyGlossary /></main>;
}
