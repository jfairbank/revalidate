import createValidator from '../createValidator';

const regex = /^[A-Za-z]+$/;

export default createValidator(
  message => value => {
    if (value && !regex.test(value)) {
      return message;
    }
  },

  field => `${field} must be alphabetic`
);
