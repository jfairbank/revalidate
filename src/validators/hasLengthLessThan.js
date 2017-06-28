// @flow
import createValidatorFactory from '../createValidatorFactory';

export default createValidatorFactory(
  (message, max: number) => value => {
    if (value && value.length >= max) {
      return message;
    }
  },

  (field, max: number) => `${field} cannot be longer than ${max - 1} characters`,
);
