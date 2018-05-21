import { assert } from '@ember/debug';
import { alias } from '@ember/object/computed';
import Evented from '@ember/object/evented';
import { getOwner } from '@ember/application';
import Service from '@ember/service';
import { computed, set } from '@ember/object';
import { runTask } from 'ember-lifeline';

export default Service.extend(Evented, {
  currentSlideIndex: 0,

  currentSlide: computed('currentSlideIndex', function() {
    return this.slides.objectAt(this.currentSlideIndex);
  }),

  currentSlideName: alias('currentSlide.name'),

  init() {
    this._super(...arguments);

    let { EmberPrezi: { slides } } = getOwner(this).resolveRegistration('config:environment');
    this.validateSlides(slides.mapBy('name'));
    set(this, 'slides', slides);
  },

  validateSlides(slides) {
    slides.forEach(slideName => {
      let template = getOwner(this).lookup(`template:components/${slideName}`);
      assert(`Can't find the component template for ${slideName}`, !!template);
    });
  },

  forward() {
    runTask(this, () => {
      if (this.currentSlide.childSlides.length) {
        this.trigger('changedSlide', { next: true });
      } else {
        this.incrementProperty('currentSlideIndex');
      }
    }, 100);
  },

  back() {
    runTask(this, () => {
      if (this.currentSlide.childSlides.length) {
        this.trigger('changedSlide', { prev: true });
      } else {
        this.decrementProperty('currentSlideIndex');
      }
    }, 100);
  }
});
