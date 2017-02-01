// @flow
import createValidatorFactory from '../createValidatorFactory';

export default createValidatorFactory(
  (message, min: number, max: number) => value => {
    if (value && (value.length < min || value.length > max)) {
      return message;
    }
  },

  (field, min: number, max: number) => `${field} must be between ${min} and ${max} characters long`,
);
