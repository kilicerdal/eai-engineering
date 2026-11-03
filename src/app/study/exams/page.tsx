import {Suspense} from "react";
import StudyNavigation from "@/components/StudyNavigation";
import StudyExamPractice from "@/components/StudyExamPractice";
import SharedAIChat from "@/components/SharedAIChat";
export default function ExamPracticePage(){return <main><StudyNavigation/><Suspense fallback={<p className="exam-practice-loading" role="status">Opening your exam practice…</p>}><StudyExamPractice/></Suspense><SharedAIChat/></main>;}
