import { set } from '@ember/object';
import SlideWithTitle from '../slide-with-title/component';
import VisibilityMixin from 'tech-talk/mixins/visibility';

export default SlideWithTitle.extend(VisibilityMixin, {
  init() {
    this._super(...arguments);

    let getterSlides = [
      'getters-slide/examples/before-slide',
      'getters-slide/examples/after-slide'
    ];

    set(this, 'slides', getterSlides);
  },
});
