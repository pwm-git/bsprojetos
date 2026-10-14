export function trackConversion(event: string, source: string) {
  const trackingWindow = window as Window & { dataLayer?: Record<string, unknown>[]; gtag?: (...args: unknown[]) => void };
  trackingWindow.dataLayer = trackingWindow.dataLayer || [];
  trackingWindow.dataLayer.push({ event, source });
  trackingWindow.gtag?.('event', event, { source });
  window.dispatchEvent(new CustomEvent('bs:conversion', { detail: { event, source } }));
}

export function selectService(service: string) {
  window.dispatchEvent(new CustomEvent('bs:service', { detail: service }));
  document.getElementById('orcamento')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
}
