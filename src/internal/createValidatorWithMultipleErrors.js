// @flow
import isValueValidator from './isValueValidator';

function validateWithValidator(
  value: ?any,
  allValues: ?Object,
  sharedConfig: Config,
  validator: Validator,
): ?string {
  if (isValueValidator(validator)) {
    return validator(value, allValues);
  }

  return validator(sharedConfig, value, allValues);
}

export default function createValidatorWithMultipleErrors(
  firstValidator: Validator | Object,
  validators: Array<Validator>,
  sharedConfig: Config,
): ConfiguredValidator {
  if (typeof firstValidator === 'object') {
    return function composedValidator(value, allValues): Object {
      return Object.keys(firstValidator).reduce((errors, key) => {
        const validator = firstValidator[key];

        const errorMessage = validateWithValidator(
          value,
          allValues,
          sharedConfig,
          validator,
        );

        if (errorMessage) {
          errors[key] = errorMessage;
        }

        return errors;
      }, {});
    };
  }

  return function composedValidator(value, allValues): Array<any> {
    return [firstValidator].concat(validators).reduce((errors, validator) => {
      const errorMessage = validateWithValidator(
        value,
        allValues,
        sharedConfig,
        validator,
      );

      if (errorMessage) {
        errors.push(errorMessage);
      }

      return errors;
    }, []);
  };
}
