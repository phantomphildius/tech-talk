// **** after ****

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('x-foo', function(hooks) {
  setupRenderingTest(hooks);

  test('renders', async function(assert) {
    assert.expect(1);

    await this.render(hbs`{{pretty-color name="red"}}`);

    assert.equal(this.$('.color-name').text(), 'red');
  });
});
