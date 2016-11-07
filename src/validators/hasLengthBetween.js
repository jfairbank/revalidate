// @flow
import createValidator from '../createValidator';

export default function hasLengthBetween(
  min: number,
  max: number,
): ConfigurableValidator {
  return createValidator(
    message => value => {
      if (value && (value.length < min || value.length > max)) {
        return message;
      }
    },

    field => `${field} must be between ${min} and ${max} characters long`,
  );
}
