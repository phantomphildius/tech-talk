import { set } from '@ember/object';
import SlideWithTitle from '../slide-with-title/component';
import VisibilityMixin from 'tech-talk/mixins/visibility';

export default SlideWithTitle.extend(VisibilityMixin, {
  init() {
    this._super(...arguments);

    // TODO define these in the controller as an object so this doens't need to exist
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
});
