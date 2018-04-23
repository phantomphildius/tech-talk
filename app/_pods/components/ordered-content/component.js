import Component from '@ember/component';
import { getOwner } from '@ember/application';
import { computed } from '@ember/object';
import { task, waitForEvent } from 'ember-concurrency';

export default Component.extend({
  tagName: '',
  isVisible: false,
  appController: computed(function() {
    return getOwner(this).lookup('controller:application');
  }),

  waitForNextContent: task(function * () {
    while(true) { // eslint-disable-line no-constant-condition
      let { order, preventAdvance } = yield waitForEvent(this.appController, 'next');

      if (this.order === order) {
        preventAdvance();
        this.toggleProperty('isVisible');
        return;
      }
    }
  }).on('init')
});
