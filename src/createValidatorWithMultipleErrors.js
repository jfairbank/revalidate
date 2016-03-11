import { isValueValidator } from './configureValueValidator';

export default function createValidatorWithMultipleErrors(validators, sharedConfig) {
  return function composedValidator(value) {
    return validators.reduce((errors, validator) => {
      let errorMessage;

      if (isValueValidator(validator)) {
        errorMessage = validator(value);
      } else {
        errorMessage = validator(sharedConfig, value);
      }

      if (errorMessage) {
        errors.push(errorMessage);
      }

      return errors;
    }, []);
  };
}
