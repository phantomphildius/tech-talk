import { assert } from '@ember/debug';
import Evented from '@ember/object/evented';
import { getOwner } from '@ember/application';
import Service from '@ember/service';
import { computed, set } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default Service.extend(Evented, {
  currentSlideIndex: 0,
  currentSlide: computed('currentSlideIndex', function() {
    return this.slides.objectAt(this.currentSlideIndex);
  }),
  init() {
    this._super(...arguments);

    let validSlides = this.validateSlides();
    set(this, 'slides', validSlides);
  },

  validateSlides() {
    let owner = getOwner(this);
    let { EmberPrezi: { slides } } = getOwner(this).resolveRegistration('config:environment');

    return slides.filter(slideName => {
      let template = owner.lookup(`template:components/${slideName}`);
      if (isEmpty(template)) {
        assert(`Can't find the component template for ${slideName}`);
      }
      return template
    });
  },

  forward() {
    this.incrementProperty('currentSlideIndex');
    this.trigger('change', 1);
  },

  back() {
    this.decrementProperty('currentSlideIndex');
    this.trigger('change', -1);
  }
});
