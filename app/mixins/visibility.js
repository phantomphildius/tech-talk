import Mixin from '@ember/object/mixin';
import { getOwner } from '@ember/application';
import { computed, set } from '@ember/object';
import { task, waitForEvent } from 'ember-concurrency';

export default Mixin.create({
  order: 0,

  init() {
    this._super(...arguments);
    set(this, 'slides', []);
  },

  appController: computed(function() {
    return getOwner(this).lookup('controller:application');
  }),

  continue: computed('order', function() {
    return this.order < this.slides.length - 1;
  }),
  slideName: computed('order', function() {
    return this.slides.objectAt(this.order);
  }),

  waitForNextContent: task(function * () {
    while(true) { // eslint-disable-line no-constant-condition
      let { order, preventAdvance } = yield waitForEvent(this.appController, 'next');

      if (this.order === order && this.continue) {
        preventAdvance();
        this.updateVisibility();
      }
    }
  }).on('didInsertElement'),

  updateVisibility() {
    this.incrementProperty('order');
  }
})
