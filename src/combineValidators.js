export default function combineValidators(validators) {
  return function valuesValidator(values) {
    return Object.keys(validators).reduce((errors, fieldName) => {
      const errorMessage = validators[fieldName](values[fieldName], values);

      if (errorMessage) {
        errors[fieldName] = errorMessage;
      }

      return errors;
    }, {});
  };
}
