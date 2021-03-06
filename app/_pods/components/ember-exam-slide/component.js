import { set } from '@ember/object';
import SlideWithTitle from '../slide-with-title/component';
import VisibilityMixin from 'tech-talk/mixins/visibility';

export default SlideWithTitle.extend(VisibilityMixin, {
  init() {
    this._super(...arguments);

    let emberExamSlides = [
      'ember-exam-slide/examples/before-slide',
      'ember-exam-slide/examples/after-slide',
    ];

    set(this, 'slides', emberExamSlides);
  }
});
