import type { Route } from './+types/home';
import { seo } from '@/lib/seo';
import { Hero } from '@/components/home/hero';
import { TrustStrip } from '@/components/home/trust-strip';
import { About } from '@/components/home/about';
import { Services } from '@/components/home/services';
import { ProblemSolution } from '@/components/home/problem-solution';
import { Process } from '@/components/home/process';
import { Portfolio } from '@/components/home/portfolio';
import { Differences } from '@/components/home/differences';
import { Authority } from '@/components/home/authority';
import { SocialProof } from '@/components/home/social-proof';
import { Faq } from '@/components/home/faq';
import { Contact } from '@/components/home/contact';
import { faqs } from '@/data/home';
import { site } from '@/constants/site';

export function meta({ matches, location }: Route.MetaArgs) {
  return seo({ matches, location }, {
    title: 'BS Projetos | Projetos Arquitetônicos, Obras e Reformas',
    description: 'Projetos arquitetônicos, projetos 3D, obras, reformas e AVCB/CLCB com planejamento e atendimento próximo. Solicite seu orçamento com a BS Projetos.',
    image: site.brandImage,
    jsonLd: [
      { '@context': 'https://schema.org', '@type': 'ProfessionalService', name: site.name, image: site.brandImage, description: 'Projetos arquitetônicos, projetos em 3D, obras, reformas e projetos de combate a incêndio (AVCB/CLCB).' },
      { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
    ],
  });
}
export default function HomePage() {
  return <main><Hero /><TrustStrip /><About /><Services /><ProblemSolution /><Process /><Portfolio /><Differences /><Authority /><SocialProof /><Faq /><Contact /></main>;
}
