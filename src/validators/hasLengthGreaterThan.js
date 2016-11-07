// @flow
import createValidator from '../createValidator';

export default function hasLengthGreaterThan(
  min: number,
): ConfigurableValidator {
  return createValidator(
    message => value => {
      if (value && value.length <= min) {
        return message;
      }
    },

    field => `${field} must be longer than ${min} characters`,
  );
}
