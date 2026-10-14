onRecordAfterCreateSuccess((e) => {
  const recipient = $os.getenv('BS_LEADS_EMAIL');
  if (recipient) {
    const escape = (value) => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    const record = e.record;
    const body = `<h1>Nova solicitação de orçamento</h1><p><b>Nome:</b> ${escape(record.getString('name'))}</p><p><b>WhatsApp:</b> ${escape(record.getString('whatsapp'))}</p><p><b>E-mail:</b> ${escape(record.getString('email'))}</p><p><b>Serviço:</b> ${escape(record.getString('service'))}</p><p><b>Necessidade:</b> ${escape(record.getString('message'))}</p>`;
    try {
      $app.newMailClient().send(new MailerMessage({ from: { name: 'BS Projetos' }, to: [{ address: recipient }], subject: 'BS Projetos — nova solicitação de orçamento', html: body }));
    } catch (err) {
      $app.logger().error('Falha na notificação de orçamento; solicitação preservada no banco.', 'err', String(err));
    }
  } else {
    $app.logger().warn('E-mail de recebimento da BS Projetos não configurado; solicitação salva no banco.');
  }
  e.next();
}, 'budget_requests');
