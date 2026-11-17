import LocalChanges from '@/components/LocalChanges';
import report from '../../../../public/evidence/learning-link-audit.json';
export const metadata={title:'What changed locally | eAI',description:'Review the current local learning improvements, preview data and source-link health report.',robots:{index:false,follow:false}};
export default function Page(){return <LocalChanges report={report}/>;}
