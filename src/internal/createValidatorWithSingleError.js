// @flow
import isValueValidator from './isValueValidator';

export default function createValidatorWithSingleError(
  validators: Array<Validator>,
  sharedConfig: ComposeConfig,
): ConfiguredValidator {
  return function composedValidator(value, allValues, idx) {
    for (let i = 0, l = validators.length; i < l; i++) {
      const validator = validators[i];
      let errorMessage;

      if (isValueValidator(validator)) {
        errorMessage = validator(value, allValues, idx);
      } else {
        errorMessage = validator(sharedConfig, value, allValues, idx);
      }

      if (errorMessage) {
        return errorMessage;
      }
    }
  };
}
