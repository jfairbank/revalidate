// @flow
import isValueValidator from './isValueValidator';

export default function createValidatorWithSingleError(
  validators: Array<Validator>,
  sharedConfig: ComposeConfig,
): ConfiguredValidator {
  return function composedValidator(value, allValues, props) {
    for (let i = 0, l = validators.length; i < l; i++) {
      const validator = validators[i];
      let errorMessage;

      if (isValueValidator(validator)) {
        errorMessage = validator(value, allValues, props);
      } else {
        errorMessage = validator(sharedConfig, value, allValues, props);
      }

      if (errorMessage) {
        return errorMessage;
      }
    }
  };
}
