/* eslint-disable */
test('it renders with board and selected role', function(assert) {
  this.set('people', []);
  this.set('role', role);
  this.set('board', board);

  this.render(hbs`{{settings/people/list-by-role people=people role=role board=board}}`);
  assert.ok(this.$().text().indexOf('Looks like David Ortiz doesn\'t have a video analyst yet.') > -1, 'no people message renders properly');
  assert.ok(this.$().text().indexOf('Select "Invite Users" above to add one!') > -1, 'no people message renders properly');
});
