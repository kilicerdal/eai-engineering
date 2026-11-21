/** Shared typographic refinement of the existing eAI / dAI identities. */
export default function BrandWordmark({name='eAI',descriptor='Intelligence Engineered'}:{name?:'eAI'|'dAI';descriptor?:string}){
 return <span className="brand-lockup"><span className="brand-compass" aria-hidden="true">✧</span><span className="brand-wordmark">{name}</span><span className="brand-rule" aria-hidden="true"/>{' '}<span className="brand-descriptor">{descriptor}</span></span>;
}
