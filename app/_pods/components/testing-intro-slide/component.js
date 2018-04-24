import VisibilityMixin from 'tech-talk/mixins/visibility';
import { not } from '@ember/object/computed';
import SlideWithTitle from '../slide-with-title/component';

export default SlideWithTitle.extend(VisibilityMixin, {
  order: 0,
  showRobert: false,

  continue: not('showRobert'),

  updateVisibility() {
    this.toggleProperty('showRobert');
  }
})
