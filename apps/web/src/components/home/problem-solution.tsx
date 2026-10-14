import { ArrowUpRight, Check, Minus } from 'lucide-react';
import { painPoints } from '@/data/home';
export function ProblemSolution() {
  return <section className="problem section-light"><div className="section-rail problem-grid"><div><span className="eyebrow">03 / MENOS IMPROVISO. MAIS DIREÇÃO.</span><h2>Construir ou reformar<br />não precisa ser uma<br />sucessão de <em>improvisos.</em></h2><p className="lead">Antes de executar, é preciso entender. Antes de decidir, é preciso visualizar.</p></div><div><ul className="pain-list">{painPoints.map(pain => <li key={pain}><Minus size={16} />{pain}</li>)}</ul><div className="solution"><Check size={23} strokeWidth={1.4} /><p>A BS Projetos ajuda a transformar a ideia em um caminho mais claro, planejado e profissional.</p></div><a href="#orcamento" className="text-link">Comece pelo planejamento <ArrowUpRight size={18} /></a></div></div></section>;
}
