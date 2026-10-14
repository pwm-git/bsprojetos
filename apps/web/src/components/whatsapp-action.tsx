import { useRef } from 'react';
import { ArrowUpRight, MessageCircle, X } from 'lucide-react';
import { site } from '@/constants/site';
import { trackConversion } from '@/lib/conversion';

type Props = { source: string; className?: string; children?: React.ReactNode; iconOnly?: boolean };
export function WhatsappAction({ source, className = '', children = 'Falar pelo WhatsApp', iconOnly = false }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const message = 'Olá, Bryan! Conheci a BS Projetos e gostaria de solicitar informações sobre um projeto.';
  const content = <><MessageCircle size={19} strokeWidth={1.6} />{!iconOnly && <span>{children}</span>}</>;
  if (site.whatsapp) return <a className={className} aria-label="Falar pelo WhatsApp" href={`https://wa.me/55${site.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion('whatsapp_click', source)}>{content}</a>;
  return <>
    <button type="button" className={className} aria-label="Falar pelo WhatsApp" onClick={() => { trackConversion('whatsapp_click', source); dialog.current?.showModal(); }}>{content}</button>
    <dialog ref={dialog} className="contact-dialog" aria-labelledby={`whatsapp-${source}`}>
      <button type="button" className="dialog-close" aria-label="Fechar" onClick={() => dialog.current?.close()}><X size={22} /></button>
      <span className="eyebrow">CONTATO BS PROJETOS</span>
      <p id={`whatsapp-${source}`} className="dialog-title">Vamos conversar sobre seu projeto.</p>
      <p>O número de WhatsApp ainda precisa ser informado: <span className="pending">[INSERIR INFORMAÇÃO]</span>.</p>
      <p>Enquanto isso, você pode enviar sua solicitação pelo formulário.</p>
      <a href="/#orcamento" className="button button-gold" onClick={() => dialog.current?.close()}>Solicitar orçamento <ArrowUpRight size={18} /></a>
    </dialog>
  </>;
}
