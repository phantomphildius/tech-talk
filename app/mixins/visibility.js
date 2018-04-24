import { computed } from '@ember/object';
import Mixin from '@ember/object/mixin';
import { getOwner } from '@ember/application';
import { task, waitForEvent } from 'ember-concurrency';

export default Mixin.create({
  appController: computed(function() {
    return getOwner(this).lookup('controller:application');
  }),

  waitForNextContent: task(function * () {
    while(true) { // eslint-disable-line no-constant-condition
      let { order, preventAdvance } = yield waitForEvent(this.appController, 'next');

      if (this.order === order && this.continue) {
        preventAdvance();
        this.updateVisibility();
      }
    }
  }).on('didInsertElement')
})
