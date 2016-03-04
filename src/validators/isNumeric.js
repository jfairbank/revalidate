import createValidator from '../createValidator';

const regex = /^\d+$/;

export default createValidator(
  message => value => {
    if (value && !regex.test(value)) {
      return message;
    }
  },

  field => `${field} must be numeric`
);
