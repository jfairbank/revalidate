import parseFieldName from './parseFieldName';

export default function internalCombineValidators(validators, atRoot = false, isImmutable = false) {
  return function valuesValidator(rawValues = {}, allValues = {}) {
    let values = rawValues;
    if (isImmutable && rawValues.toJS) {
      values = rawValues.toJS();
    }
    return Object.keys(validators).reduce((errors, fieldName) => {
      const parsedField = parseFieldName(fieldName);
      const validator = validators[parsedField.fullName];
      const value = values[parsedField.baseName];
      const finalAllValues = atRoot ? values : allValues;

      const errorMessage = parsedField.isArray
        ? (value || []).map(fieldValue => validator(fieldValue, finalAllValues))
        : validator(value, finalAllValues);

      if (errorMessage) {
        errors[parsedField.baseName] = errorMessage;
      }

      return errors;
    }, {});
  };
}
