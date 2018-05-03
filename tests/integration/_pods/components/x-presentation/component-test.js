import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | x-presentation', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders its block text inside a liquid-fire wrapper', async function(assert) {
    await render(hbs`
      {{#x-presentation}}
        template block text
      {{/x-presentation}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
