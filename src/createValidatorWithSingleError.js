import { isValueValidator } from './configureValueValidator';

export default function createValidatorWithSingleError(validators, sharedConfig) {
  return function composedValidator(value) {
    for (let i = 0, l = validators.length; i < l; i++) {
      const validator = validators[i];
      let errorMessage;

      if (isValueValidator(validator)) {
        errorMessage = validator(value);
      } else {
        errorMessage = validator(sharedConfig, value);
      }

      if (errorMessage) {
        return errorMessage;
      }
    }
  };
}
