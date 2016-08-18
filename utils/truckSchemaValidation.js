import geocoder from 'utils.js';

// call with validate.name(value), etc.
// each method returns a Boolean

const Validate = {
  name(string) {
    return typeof string === 'string';
  },
  handle(string) {
    if (typeof string === 'string') {
      return string.length <= 15;
    } else {
      return false;
    }
  },
  website(string) {
    return typeof string === 'string';
  },
  description(string) {
    return typeof string === 'string';
  },
  location(string) {
    if (typeof string === 'string') {
      
    }
  },
  yelpId(string) {
    return typeof string === 'string';
  }
}

export default Validate;
