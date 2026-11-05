import type {Metadata} from 'next';
import './recruiters.css';
export const metadata:Metadata={title:'Private recruiter access | Erdal Kilic',robots:{index:false,follow:false,noarchive:true},referrer:'no-referrer'};
export default function RecruiterLayout({children}:{children:React.ReactNode}){return <main className="recruiter-portal">{children}</main>;}
