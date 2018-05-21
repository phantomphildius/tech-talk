'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'tech-talk',
    podModulePrefix: 'tech-talk/_pods',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    EmberPrezi: {
      slides: [
        { name: 'title-slide', childSlides: [] },
        { name: 'intro-slide', childSlides: [] },
        { name: 'toc-slide', childSlides: [] },
        { name: 'testing-intro-slide', childSlides: [] },
        {
          name: 'rfcs-slide',
          childSlides: [
            'rfc-232-slide',
            'rfc-232-slide/examples/before-slide',
            'rfc-232-slide/examples/after-slide',
            'rfc-268-slide',
            'rfc-268-slide/examples/before-slide',
            'rfc-268-slide/examples/after-slide',
          ]
        },
        { name: 'helpers-slide', childSlides: [] },
        { name: 'page-object-slide', childSlides: [] },
        { name: 'qunit-dom-slide', childSlides: [] },
        { name: 'ember-exam-slide', childSlides: [] },
        { name: 'eslint-slide', childSlides: [] },
        { name: 'ember-three-one-slide', childSlides: [] },
        { name: 'getters-slide', childSlides: [] },
        { name: 'named-args-slide', childSlides: [] },
        { name: 'optional-features-slide', childSlides: [] },
        { name: 'deprecations-slide', childSlides: [] },
        { name: 'the-future-slide', childSlides: [] }
      ]
    }
  }

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
