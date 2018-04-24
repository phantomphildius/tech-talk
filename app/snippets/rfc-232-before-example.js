// **** before ****
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('x-foo', {
  integration: true
});

test('renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{pretty-color name="red"}}`);

  assert.equal(this.$('.color-name').text(), 'red');
});
