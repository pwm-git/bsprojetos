import { ArrowUpRight } from 'lucide-react';
import { BudgetForm } from '@/components/home/budget-form';
import { WhatsappAction } from '@/components/whatsapp-action';
export function Contact() {
  return <section id="orcamento" className="contact section-dark"><div className="section-rail contact-grid"><div className="contact-copy"><span className="eyebrow">08 / SEU PRÓXIMO PASSO</span><h2>Vamos tirar<br />seu projeto<br />do <em>papel?</em></h2><p className="lead">Conte para a BS Projetos o que você precisa e receba uma orientação inicial sobre o melhor caminho para o seu projeto.</p><p>É rápido. Você explica o que precisa e nossa equipe orienta os próximos passos.</p><a href="#budget-name" className="text-link">SOLICITAR ORÇAMENTO <ArrowUpRight size={17} /></a><div className="contact-alternative"><span>PREFERE CONVERSAR?</span><WhatsappAction source="final" className="text-link">CHAMAR NO WHATSAPP</WhatsappAction></div><span className="contact-corner" aria-hidden="true">+</span></div><BudgetForm /></div></section>;
}
