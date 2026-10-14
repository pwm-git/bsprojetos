import { ArrowUpRight } from 'lucide-react';
import { WhatsappAction } from '@/components/whatsapp-action';
export function ConversionBar() {
  return <><div className="floating-whatsapp"><WhatsappAction source="flutuante" className="floating-whatsapp-button">Falar pelo WhatsApp</WhatsappAction></div><div className="mobile-conversion"><a href="/#orcamento">SOLICITAR ORÇAMENTO <ArrowUpRight size={18} /></a><WhatsappAction source="barra-mobile" className="mobile-whatsapp" iconOnly /></div></>;
}
