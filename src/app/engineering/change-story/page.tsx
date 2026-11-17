import ChangeStory from '@/components/engineering/ChangeStory';
import review from '../../../../public/evidence/change-story-review.json';
import capture from '../../../../public/evidence/checkout-scenarios.json';
export const metadata={title:'Follow one public change | eAI Engineering',description:'A public checkout capture change, its recorded observations, related regression source and a tiny reproducible browser model.'};
export default function Page(){if(review.commit!==capture.source.commit)throw Error('The public change and capture source pins differ.');return <ChangeStory review={review} capture={capture}/>;}
