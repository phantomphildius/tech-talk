import HiddenContentMixin from 'tech-talk/mixins/hidden-content';
import SlideWithTitle from '../slide-with-title/component';
import { computed, set } from '@ember/object';

export default SlideWithTitle.extend(HiddenContentMixin, {
  order: 0,

  continue: computed('order', function() {
    return this.order < this.slides.length;
  }),
  slideName: computed('order', function() {
    return this.slides.objectAt(this.order);
  }),

  init() {
    this._super(...arguments);

    let rfcSlides = [
      'rfc-232-slide',
      'rfc-232-slide/examples/before-slide',
      'rfc-232-slide/examples/after-slide',
      'rfc-268-slide',
      'rfc-268-slide/examples/before-slide',
      'rfc-268-slide/examples/after-slide',
    ];

    set(this, 'slides', rfcSlides);
  },

  updateVisibility() {
    this.incrementProperty('order');
  }
});
