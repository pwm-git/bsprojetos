import { ClipboardList, Layers3, MessagesSquare, ScanLine } from 'lucide-react';
import { trustItems } from '@/data/home';
const icons = { plan: ScanLine, contact: MessagesSquare, layers: Layers3, document: ClipboardList };
export function TrustStrip() {
  return <section className="trust-strip" aria-label="O que você encontra na BS Projetos"><div className="trust-rail">{trustItems.map(item => { const Icon = icons[item.icon as keyof typeof icons]; return <div className="trust-item" key={item.title}><Icon size={26} strokeWidth={1.2} /><div><h3>{item.title}</h3><p>{item.description}</p></div></div>; })}</div></section>;
}
