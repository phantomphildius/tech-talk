import { set } from '@ember/object';
import SlideWithTitle from '../slide-with-title/component';
import VisibilityMixin from 'tech-talk/mixins/visibility';

export default SlideWithTitle.extend(VisibilityMixin, {
  init() {
    this._super(...arguments);

    // oh local lookup how i long for thee
    let pageObjectSlides = [
      'page-object-slide/examples/martin-fowler-slide',
      'page-object-slide/examples/before-slide',
      'page-object-slide/examples/after-slide'
    ];

    set(this, 'slides', pageObjectSlides);
  }
});
