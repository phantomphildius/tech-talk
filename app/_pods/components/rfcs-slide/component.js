import { equal } from '@ember/object/computed';
import { getOwner } from '@ember/application';
import { inject as service } from '@ember/service';
import SlideWithTitle from '../slide-with-title/component';
import { computed, set } from '@ember/object';
import { task, waitForEvent } from 'ember-concurrency';

export default SlideWithTitle.extend({
  slides: service(),

  currentContentIndex: 0,

  isFirstVisibleContent: equal('currentContentIndex', 0),

  contentLength: computed('childSlides.[]', function() {
    return this.childSlides.length - 1;
  }),
  currentChildSlide: computed('currentContentIndex', function() {
    return this.childSlides.objectAt(this.currentContentIndex);
  }),
  isLastVisibleContent: computed('currentContentIndex', function() {
    return this.currentContentIndex === this.contentLength;
  }),

  init() {
    this._super(...arguments);

    let { EmberPrezi: { slides } } = getOwner(this).resolveRegistration('config:environment');
    let { childSlides } = slides.findBy('name', 'rfcs-slide');
    this.slides.validateSlides(childSlides)

    set(this, 'childSlides', childSlides);
  },

  handleChildSlides: task(function * () {
    while (true) { // eslint-disable-line no-constant-condition
      let { next, prev } = yield waitForEvent(this.slides, 'changedSlide');

      if (next && !this.isLastVisibleContent) {
        this.incrementProperty('currentContentIndex');
      } else if (next && this.isLastVisibleContent) {
        this.incrementProperty('slides.currentSlideIndex');
      }

      if (prev && !this.isFirstVisibleContent) {
        this.decrementProperty('currentContentIndex');
      } else if (prev && this.isFirstVisibleContent){
        this.decrementProperty('slides.currentSlideIndex');
      }
    }
  }).on('didInsertElement')
});
