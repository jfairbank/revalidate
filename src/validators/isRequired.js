import createValidator from '../createValidator';

export default createValidator(
  message => value => {
    if (value == null) {
      return message;
    }

    if (typeof value === 'string' && value.trim() === '') {
      return message;
    }
  },

  field => `${field} is required`
);
