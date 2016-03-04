import createValidator from '../createValidator';

export default function hasLengthLessThan(max) {
  return createValidator(
    message => value => {
      if (value && value.length >= max) {
        return message;
      }
    },

    field => `${field} cannot be longer than ${max} characters`
  );
}
