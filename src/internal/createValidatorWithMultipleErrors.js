import isValueValidator from './isValueValidator';

function buildErrorsArray(validators, validate) {
  return validators.reduce((errors, validator) => {
    const errorMessage = validate(validator);

    if (errorMessage) {
      errors.push(errorMessage);
    }

    return errors;
  }, []);
}

function buildErrorsObject(validators, validate) {
  return Object.keys(validators).reduce((errors, key) => {
    const validator = validators[key];
    const errorMessage = validate(validator);

    if (errorMessage) {
      errors[key] = errorMessage;
    }

    return errors;
  }, {});
}

export default function createValidatorWithMultipleErrors(validators, sharedConfig) {
  let buildErrors;
  let finalValidators;

  if (typeof validators[0] === 'object') {
    buildErrors = buildErrorsObject;
    finalValidators = validators[0];
  } else {
    buildErrors = buildErrorsArray;
    finalValidators = validators;
  }

  return function composedValidator(value, allValues) {
    return buildErrors(finalValidators, (validator) => {
      if (isValueValidator(validator)) {
        return validator(value, allValues);
      }

      return validator(sharedConfig, value, allValues);
    });
  };
}
