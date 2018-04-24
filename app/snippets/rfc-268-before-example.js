/* eslint-disable no-undef */
// **** before ****
import { test } from 'qunit';
import moduleForAcceptance from '../helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | posts');

test('should add new post', function(assert) {
  visit('/posts/new');
  fillIn('input.title', 'My new post');
  click('button.submit');
  andThen(() => assert.equal(find('ul.posts li:first').text(), 'My new post'));
});

