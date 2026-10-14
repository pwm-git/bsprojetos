import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, LoaderCircle, LockKeyhole } from 'lucide-react';
import { Link } from 'react-router';
import { pocketbaseClient } from '@/lib/pocketbase-client';
import { serviceOptions } from '@/constants/site';
import { trackConversion } from '@/lib/conversion';

type Values = { name: string; whatsapp: string; email: string; service: string; message: string; website: string };
const initialValues: Values = { name: '', whatsapp: '', email: '', service: '', message: '', website: '' };
function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits ? `(${digits}` : '';
  const middleLength = digits.length > 10 ? 5 : 4;
  const middle = digits.slice(2, 2 + middleLength);
  const last = digits.slice(2 + middleLength);
  return `(${digits.slice(0, 2)}) ${middle}${last ? `-${last}` : ''}`;
}
export function BudgetForm() {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [error, setError] = useState('');
  const [liveMessage, setLiveMessage] = useState('');
  useEffect(() => {
    const handle = (event: Event) => {
      const service = (event as CustomEvent<string>).detail;
      if (serviceOptions.some(option => option === service)) {
        setValues(previous => ({ ...previous, service }));
        setStatus('idle');
        setErrors(previous => ({ ...previous, service: undefined }));
      }
    };
    window.addEventListener('bs:service', handle);
    return () => window.removeEventListener('bs:service', handle);
  }, []);
  function update(key: keyof Values, value: string) {
    setValues(previous => ({ ...previous, [key]: key === 'whatsapp' ? formatPhone(value) : value }));
    setErrors(previous => ({ ...previous, [key]: undefined }));
    setError('');
  }
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;
    const validation: Partial<Record<keyof Values, string>> = {};
    const digits = values.whatsapp.replace(/\D/g, '');
    if (values.name.trim().length < 2) validation.name = 'Informe seu nome com pelo menos 2 caracteres.';
    if (!/^[1-9]{2}[0-9]{8,9}$/.test(digits)) validation.whatsapp = 'Informe um WhatsApp válido com DDD.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) validation.email = 'Informe um e-mail válido.';
    if (!serviceOptions.some(option => option === values.service)) validation.service = 'Selecione o serviço que você procura.';
    setErrors(validation);
    if (Object.keys(validation).length) {
      setLiveMessage('Confira os campos destacados no formulário.');
      return;
    }
    if (values.website) { setError('Não foi possível enviar a solicitação. Recarregue a página e tente novamente.'); return; }
    setStatus('sending');
    setError('');
    setLiveMessage('');
    try {
      await pocketbaseClient.collection('budget_requests').create({ ...values, name: values.name.trim(), whatsapp: digits, email: values.email.trim().toLowerCase(), message: values.message.trim(), website: '' });
      setStatus('success');
      trackConversion('budget_request_sent', 'formulario');
      setValues(initialValues);
    } catch (err) {
      const response = err as { status?: number; response?: { data?: Record<string, { message?: string }> } };
      if (response.status === 400 && response.response?.data) {
        const fieldErrors: Partial<Record<keyof Values, string>> = {};
        for (const key of Object.keys(response.response.data)) {
          if (key in initialValues) fieldErrors[key as keyof Values] = 'Confira este campo e tente novamente.';
        }
        setErrors(fieldErrors);
      }
      setError('Não foi possível enviar sua solicitação. Confira os dados e tente novamente.');
      setStatus('idle');
    }
  }
  if (status === 'success') return <div className="form-success" role="status" aria-live="polite" aria-atomic="true"><span className="success-icon"><Check size={29} strokeWidth={1.5} /></span><span className="eyebrow">O PRIMEIRO PASSO ESTÁ DADO</span><h3>Recebemos sua solicitação.</h3><p>A BS Projetos entrará em contato para entender melhor sua necessidade e orientar os próximos passos.</p><button className="text-link" type="button" onClick={() => setStatus('idle')}>Enviar outra solicitação <ArrowUpRight size={18} /></button></div>;
  return <form className="budget-form" onSubmit={submit} noValidate aria-label="Solicitação de orçamento">
    <div className="form-title"><h3>Conte sobre o seu projeto</h3><span>* Campos obrigatórios</span></div>
    <p className="sr-only" aria-live="polite" role="status">{liveMessage}</p>
    <div className="field"><label htmlFor="budget-name">Nome <span>*</span></label><input id="budget-name" name="name" autoComplete="name" placeholder="Como podemos chamar você?" required maxLength={120} value={values.name} onChange={e => update('name', e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} />{errors.name && <span className="field-error" id="name-error">{errors.name}</span>}</div>
    <div className="form-row"><div className="field"><label htmlFor="budget-whatsapp">WhatsApp <span>*</span></label><input id="budget-whatsapp" name="whatsapp" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="(00) 00000-0000" required value={values.whatsapp} onChange={e => update('whatsapp', e.target.value)} aria-invalid={!!errors.whatsapp} aria-describedby={errors.whatsapp ? 'whatsapp-error' : undefined} />{errors.whatsapp && <span className="field-error" id="whatsapp-error">{errors.whatsapp}</span>}</div><div className="field"><label htmlFor="budget-email">E-mail <span>*</span></label><input id="budget-email" name="email" type="email" autoComplete="email" placeholder="voce@email.com" required maxLength={254} value={values.email} onChange={e => update('email', e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} />{errors.email && <span className="field-error" id="email-error">{errors.email}</span>}</div></div>
    <div className="field"><label htmlFor="budget-service">Qual serviço você procura? <span>*</span></label><select id="budget-service" name="service" required value={values.service} onChange={e => update('service', e.target.value)} aria-invalid={!!errors.service} aria-describedby={errors.service ? 'service-error' : undefined}><option value="" disabled>Selecione um serviço</option>{serviceOptions.map(option => <option value={option} key={option}>{option}</option>)}</select>{errors.service && <span className="field-error" id="service-error">{errors.service}</span>}</div>
    <div className="field"><label htmlFor="budget-message">Conte brevemente o que você precisa <small>(opcional)</small></label><textarea id="budget-message" name="message" placeholder="Sua ideia, o tipo de imóvel e o que você tem em mente…" rows={3} maxLength={2500} value={values.message} onChange={e => update('message', e.target.value)} /></div>
    <div className="honeypot" aria-hidden="true"><label htmlFor="budget-website">Não preencha este campo</label><input id="budget-website" name="website" autoComplete="off" tabIndex={-1} value={values.website} onChange={e => update('website', e.target.value)} /></div>
    {error && <p className="submit-error" aria-live="polite">{error}</p>}
    <button className="button button-gold form-submit" type="submit" disabled={status === 'sending'}>{status === 'sending' ? <>ENVIANDO SOLICITAÇÃO <LoaderCircle size={19} className="loading-spinner" /></> : <>QUERO RECEBER UM ORÇAMENTO <ArrowUpRight size={19} /></>}</button>
    <p className="privacy-note"><LockKeyhole size={13} /> <span>Seus dados serão usados para responder à sua solicitação. Saiba mais na <Link to="/privacidade">política de privacidade</Link>.</span></p>
  </form>;
}
