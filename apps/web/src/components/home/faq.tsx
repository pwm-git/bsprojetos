import { Plus } from 'lucide-react';
import { faqs } from '@/data/home';
export function Faq() {
  return <section id="duvidas" className="faq section-light"><div className="section-rail faq-grid"><div><span className="eyebrow">07 / DÚVIDAS FREQUENTES</span><h2>Clareza antes<br />de <em>começar.</em></h2><p>Respostas para dar o primeiro passo<br />com mais informação.</p></div><div className="faq-items">{faqs.map(faq => <details key={faq.question}><summary>{faq.question}<Plus size={18} strokeWidth={1.4} /></summary><p>{faq.answer}</p></details>)}</div></div></section>;
}
