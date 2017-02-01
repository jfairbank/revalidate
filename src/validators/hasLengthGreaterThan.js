// @flow
import createValidatorFactory from '../createValidatorFactory';

export default createValidatorFactory(
  (message, min: number) => value => {
    if (value && value.length <= min) {
      return message;
    }
  },

  (field, min: number) => `${field} must be longer than ${min} characters`,
);
