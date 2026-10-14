import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { site } from '@/constants/site';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <a className="brand" href="/" aria-label="BS Projetos — início"><span className="brand-crop"><img src={site.logoImage} width={512} height={512} alt="Logotipo arquitetônico da BS Projetos" /></span><span><strong>BS PROJETOS</strong><small>BRYAN SALDANHA ARQUITETURA</small></span></a>
    <nav className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Navegação principal">
      <a href="/#sobre" onClick={() => setOpen(false)}>Sobre</a><a href="/#servicos" onClick={() => setOpen(false)}>Serviços</a><a href="/#portfolio" onClick={() => setOpen(false)}>Portfólio</a><a href="/#processo" onClick={() => setOpen(false)}>Como funciona</a>
    </nav>
    <a href="/#orcamento" className="header-cta">Solicitar orçamento <ArrowUpRight size={17} /></a>
    <button className="menu-toggle" type="button" aria-expanded={open} aria-label={open ? 'Fechar menu' : 'Abrir menu'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
  </header>;
}
