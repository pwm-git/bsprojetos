import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { WhatsappAction } from '@/components/whatsapp-action';
import { site } from '@/constants/site';

export function Hero() {
  return <section className="hero" aria-labelledby="hero-title">
    <img className="hero-brand-image" src={site.symbolImage} width={1200} height={896} alt="Identidade da BS Projetos: silhueta arquitetônica em metal sobre grafite" fetchPriority="high" />
    <div className="hero-shade" /><div className="technical-grid" aria-hidden="true" />
    <div className="hero-content">
      <div className="eyebrow hero-eyebrow"><span /> ARQUITETURA · PLANEJAMENTO · EXECUÇÃO</div>
      <h1 id="hero-title">Seu projeto começa<br />com planejamento.<br />Sua obra começa<br className="mobile-break" /> com <em>confiança.</em></h1>
      <p>Projetos arquitetônicos, projetos em 3D, obras, reformas e soluções técnicas para transformar sua ideia em um projeto bem planejado e executado.</p>
      <div className="hero-actions"><a className="button button-gold" href="#orcamento">SOLICITAR ORÇAMENTO <ArrowUpRight size={19} /></a><WhatsappAction source="hero" className="button button-outline">FALAR COM UM ESPECIALISTA</WhatsappAction></div>
    </div>
    <div className="hero-bottom"><span>DA PRIMEIRA IDEIA AO PRÓXIMO PASSO.</span><a href="#sobre" aria-label="Conheça a BS Projetos"><ArrowDown size={19} /><span>CONHEÇA A BS PROJETOS</span></a><span>PROJETO COM PROPÓSITO.</span></div>
  </section>;
}
