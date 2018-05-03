/* eslint-disable */
test('successful export', async function(assert) {
  let row = EmObject.create({
    boardName: 'my board',
    title: 'my export title',
    isSuccessful: true,
    createdAt: '2018-04-13'
  });
  set(this, 'export', row);

  await render(hbs`{{export-list/export-row export=export}}`);

  assert.dom('[data-test-export-row="my export title"]').exists();
  assert.dom('[data-test-export-row="my export title"]').hasClass('exports-list__row');
  assert.dom('[data-test-export-row-created-at]').hasText('04.13.18');
  assert.dom('[data-test-export-row-title]').hasText('my board - my export title');
  assert.dom('[data-test-button-icon-label="export-row"]').isNotDisabled();
  assert.dom('[data-test-button-icon-label="export-row"]').hasText('DOWNLOAD');
});
