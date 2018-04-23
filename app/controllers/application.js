import Controller from '@ember/controller';
import Evented from '@ember/object/evented';
import { equal } from '@ember/object/computed';
import { computed, set } from '@ember/object';
import { task, waitForEvent } from 'ember-concurrency';
import { next } from '@ember/runloop';

const LEFT = 37;
const RIGHT = 39;
const SPACE = 32;
const ADVANCES = [RIGHT, SPACE];

// TODO put this in a service

export default Controller.extend(Evented, {
  queryParams: ['currentSlideName'],
  currentSlideName: 'intro',
  contentOrder: 0,

  init() {
    this._super(...arguments);

    let slides = [
      'intro',
      'toc',
      'testing-intro',
      'rfcs'
    ];
    set(this, 'slides', slides);
  },

  processedSlides: computed('slides.[]', function() {
    return this.slides.map((name, index, slides) => {
      let componentName = `${name}-slide`;
      let prevSlide = slides[index - 1];
      let nextSlide = slides[index + 1];

      return { name, componentName, prevSlide, nextSlide, index };
    });
  }),

  currentSlide: computed('currentSlideName', function() {
    return this.processedSlides.findBy('name', this.currentSlideName);
  }),

  isFirstSlide: equal('currentSlide.index', 0),
  isLastSlide: computed('currentSlide', function() {
    return this.currentSlide.index === (this.slides.length - 1);
  }),

  keyEventListener: task(function * () {
    while(true) { // eslint-disable-line no-constant-condition
      let { keyCode } = yield waitForEvent(document.body, 'keydown');

      if (ADVANCES.any(key => key === keyCode)) {
        this.forward();
      }

      if (keyCode === LEFT && !this.isFirstSlide) {
        this.back();
      }
    }
  }).on('init'),

  forward() {
    let { nextSlide } = this.currentSlide;
    let prevented = false;
    let proceedEvent = {
      preventAdvance() {
        let oldPrevented = prevented;
        prevented = true;
        return !oldPrevented;
      },
      order: this.contentOrder,
    };
    this.trigger('next', proceedEvent);
    next(() => {
      if (!prevented && nextSlide) {
        set(this, 'contentOrder', 0);
        set(this, 'currentSlideName', nextSlide);
      } else {
        this.incrementProperty('contentOrder');
      }
    });
  },

  back() {
    let { prevSlide } = this.currentSlide;
    set(this, 'currentSlideName', prevSlide);
  }
});
