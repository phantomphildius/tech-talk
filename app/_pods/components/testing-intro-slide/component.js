import { not } from '@ember/object/computed';
import SlideWithTitle from '../slide-with-title/component';
import VisibilityMixin from 'tech-talk/mixins/visibility';

export default SlideWithTitle.extend(VisibilityMixin, {
  showRobert: false,

  continue: not('showRobert'),

  updateVisibility() {
    this.toggleProperty('showRobert');
  }
})
