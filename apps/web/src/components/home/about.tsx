import { ArrowUpRight } from 'lucide-react';
import { site } from '@/constants/site';
export function About() {
  return <section id="sobre" className="about section-light"><div className="section-rail about-grid">
    <div className="about-visual"><span className="corner-label">A IDENTIDADE POR TRÁS DO PROJETO</span><img src={site.brandImage} alt="Logotipo arquitetônico da BS Projetos em linhas claras sobre fundo preto" width={512} height={512} loading="lazy" /><div className="image-caption"><span>BRYAN SALDANHA</span><span>BS PROJETOS</span></div></div>
    <div className="about-copy"><span className="eyebrow">01 / SOBRE A BS PROJETOS</span><h2>Quem está por trás<br />da <em>BS Projetos?</em></h2><p className="lead">Bryan Saldanha. Um nome à frente de projetos, planejamento e soluções para o seu imóvel.</p><div className="story-pending"><div><span>ORIGEM E TRAJETÓRIA</span><p>[INSERIR INFORMAÇÃO]</p></div><div><span>FORMAÇÃO E EXPERIÊNCIA</span><p>[INSERIR INFORMAÇÃO]</p></div><div><span>PROPÓSITO E FORMA DE TRABALHO</span><p>[INSERIR INFORMAÇÃO]</p></div></div><p className="material-note">História e foto de Bryan: aguardando os materiais da BS Projetos.</p><a className="text-link" href="#orcamento">Vamos conversar sobre sua ideia <ArrowUpRight size={18} /></a></div>
  </div></section>;
}
