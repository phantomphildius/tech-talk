/* eslint-disable */

test('inline - it handles the prevPage action', function(assert) {
  let content = { page: 2, limit: 10, total: 20, offset: 10, size: 10 };
  let setPage = (newPageNum) => assert.equal(newPageNum, 1, 'it sets the prev page');
  this.set('content', content);
  this.set('setPage', setPage);

  this.render(hbs`{{scaffold-paginator content=content setPage=setPage}}`);

  this.$('a:not(.disabled)').click();
});
