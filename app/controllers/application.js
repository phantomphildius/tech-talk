import Controller from '@ember/controller';
import Evented from '@ember/object/evented';
import { equal } from '@ember/object/computed';
import { computed, get, set } from '@ember/object';
import { task, waitForEvent } from 'ember-concurrency';

const LEFT = 37;
const RIGHT = 39;
const SPACE = 32;
const ADVANCE = [RIGHT, SPACE];

export default Controller.extend(Evented, {
  currentSlideName: 'intro',

  init() {
    this._super(...arguments);

    let slides = [
      'intro',
      'toc'
    ];
    set(this, 'slides', slides);
  },

  processedSlides: computed('slides.[]', function() {
    return get(this, 'slides').map((name, index, slides) => {
      let componentName = `${name}-slide`
      let prevSlide = slides[index - 1];
      let nextSlide = slides[index + 1];

      return { name, componentName, prevSlide, nextSlide, index };
    });
  }),

  currentSlide: computed('currentSlideName', function() {
    let slide = get(this, 'currentSlideName');
    let slides = get(this, 'processedSlides');

    return slides.findBy('name', slide);
  }),

  isFirstSlide: equal('currentSlide.index', 0),
  isLastSlide: computed('currentSlide', function() {
    return get(this, 'currentSlide.index') === (get(this, 'slides').length - 1);
  }),

  keyEventListener: task(function * () {
    while(true) {
      let { keyCode } = yield waitForEvent(document.body, 'keydown');

      if (ADVANCE.any(key => key === keyCode) && !get(this, 'isLastSlide')) {
        this.forward();
      }

      if (keyCode === LEFT && !get(this, 'isFirstSlide')) {
        this.back();
      }
    }
  }).on('init'),

  forward() {
    let { nextSlide } = get(this, 'currentSlide');
    set(this, 'currentSlideName', nextSlide);
  },

  back() {
    let { prevSlide } = get(this, 'currentSlide');
    set(this, 'currentSlideName', prevSlide);
  }
});
