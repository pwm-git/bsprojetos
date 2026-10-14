migrate((app) => {
  let collection;
  try { collection = app.findCollectionByNameOrId('budget_requests'); } catch (_) {
    collection = new Collection({
      name: 'budget_requests', type: 'base',
      listRule: null, viewRule: null, createRule: "@request.body.website = ''", updateRule: null, deleteRule: null,
      fields: [
        { name: 'name', type: 'text', required: true, min: 2, max: 120 },
        { name: 'whatsapp', type: 'text', required: true, pattern: '^[0-9]{10,11}$', max: 11 },
        { name: 'email', type: 'email', required: true },
        { name: 'service', type: 'select', required: true, maxSelect: 1, values: ['Projeto arquitetônico', 'Projeto 3D', 'Obra', 'Reforma', 'AVCB / CLCB', 'Outro'] },
        { name: 'message', type: 'text', max: 2500 },
        { name: 'website', type: 'text', max: 200 },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    });
    app.save(collection);
  }
}, (app) => {
  const collection = app.findCollectionByNameOrId('budget_requests');
  app.delete(collection);
});
