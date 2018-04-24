import { not } from '@ember/object/computed';
import HiddenContentMixin from 'tech-talk/mixins/hidden-content';
import SlideWithTitle from '../slide-with-title/component';

export default SlideWithTitle.extend(HiddenContentMixin, {
  order: 0,
  showRobert: false,

  continue: not('showRobert'),

  updateVisibility() {
    this.toggleProperty('showRobert');
  }
})
