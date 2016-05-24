import isValueValidator from './isValueValidator';

export default function createValidatorWithMultipleErrors(validators, sharedConfig) {
  return function composedValidator(value, allValues) {
    return validators.reduce((errors, validator) => {
      let errorMessage;

      if (isValueValidator(validator)) {
        errorMessage = validator(value, allValues);
      } else {
        errorMessage = validator(sharedConfig, value, allValues);
      }

      if (errorMessage) {
        errors.push(errorMessage);
      }

      return errors;
    }, []);
  };
}
