import isValueValidator from './isValueValidator';

export default function createValidatorWithSingleError(validators, sharedConfig) {
  return function composedValidator(value, allValues) {
    for (let i = 0, l = validators.length; i < l; i++) {
      const validator = validators[i];
      let errorMessage;

      if (isValueValidator(validator)) {
        errorMessage = validator(value, allValues);
      } else {
        errorMessage = validator(sharedConfig, value, allValues);
      }

      if (errorMessage) {
        return errorMessage;
      }
    }
  };
}
