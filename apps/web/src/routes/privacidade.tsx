import type { Route } from './+types/privacidade';
import { seo } from '@/lib/seo';
import { PrivacyContent } from '@/components/privacy/content';
export function meta({ matches, location }: Route.MetaArgs) {
  return seo({ matches, location }, { title: 'Política de privacidade | BS Projetos', description: 'Saiba quais dados o formulário da BS Projetos coleta, para que são utilizados e quais informações sobre privacidade ainda precisam ser completadas.' });
}
export default function PrivacyPage() { return <PrivacyContent />; }
