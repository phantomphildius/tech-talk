import Evented from '@ember/object/evented';
import { inject as service } from '@ember/service';
import Mixin from '@ember/object/mixin';
import { task, waitForEvent } from 'ember-concurrency';
import { set } from '@ember/object';

export default Mixin.create(Evented, {
  slides: service(),
  order: 0,

  waitForNextContent: task(function * () {
    while(true) { // eslint-disable-line no-constant-condition
      let index = yield waitForEvent(this.slides, 'change');

      this.updateVisibility(index);
    }
  }).on('didInsertElement'),

  updateVisibility(index) {
    set(this, 'order', this.order + index);
  }
})
