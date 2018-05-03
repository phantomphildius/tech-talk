/* eslint-disable */

import hbs from 'htmlbars-inline-precompile';
import { set } from '@ember/object';
import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';

//snip

test('inline - it handles the prevPage action', async function(assert) {
  let content = { page: 2, limit: 10, total: 20, offset: 10, size: 10 };
  let setPage = (newPageNum) => assert.equal(newPageNum, 1, 'it sets the prev page');
  set(this, 'content', content);
  set(this, 'setPage', setPage);

  await render(hbs`{{scaffold-paginator content=content setPage=setPage}}`);

  await click('a:not(.disabled)');
});
