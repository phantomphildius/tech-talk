import Component from '@ember/component';
import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { addEventListener, runDisposables } from 'ember-lifeline';

const ENTER = 13;
const LEFT = 37;
const RIGHT = 39;
const SPACE = 32;
const ADVANCES = [ENTER, RIGHT, SPACE];

export default Component.extend({
  slides: service(),

  isFirstSlide: equal('slides.currentSlideIndex', 0),
  isLastSlide: computed('slides.slides.[]', function() {
    let { currentSlideIndex, slides } = this.slides;
    return currentSlideIndex === (slides.length - 1);
  }),

  didInsertElement() {
    this._super(...arguments);

    addEventListener(this, document.body, 'keydown', ({ keyCode }) => {
      if (ADVANCES.any(key => key === keyCode) && !this.isLastSlide) {
        this.slides.forward();
      }

      if (keyCode === LEFT && !this.isFirstSlide) {
        this.slides.back();
      }
    });
  },

  destroy() {
    runDisposables(this);

    this._super(...arguments);
  }
});
