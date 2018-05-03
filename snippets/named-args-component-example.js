import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  fullName: computed('firstName', 'lastName', function() {
    return `${this.firstName} ${this.lastName}`;
  })
})
