import { set } from '@ember/object';
import SlideWithTitle from '../slide-with-title/component';
import VisibilityMixin from 'tech-talk/mixins/visibility';

export default SlideWithTitle.extend(VisibilityMixin, {
  init() {
    this._super(...arguments);

    // TODO define these in the controller as an object so this doens't need to exist
    let testHelperSides = [
      'helpers-slide/examples/description-slide',
      'helpers-slide/examples/before-slide',
      'helpers-slide/examples/ember-test-helpers-slide'
    ];

    set(this, 'slides', testHelperSides);
  },
});
