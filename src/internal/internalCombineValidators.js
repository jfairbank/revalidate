// @flow
import parseFieldName from './parseFieldName';

function defaultSerializeValues<T>(values: T): T {
  return values;
}

export default function internalCombineValidators(
  validators: Object,
  atRoot: boolean,
  options: CombineValidatorsOptions = {},
): ConfiguredCombinedValidator {
  const serializeValues = atRoot && typeof options.serializeValues === 'function'
    ? options.serializeValues
    : defaultSerializeValues;

  const nullWhenValid = atRoot && options.nullWhenValid === true;

  function finalSerializeValues(values) {
    if (values == null) {
      return {};
    }

    return serializeValues(values) || {};
  }

  return function valuesValidator(values, props) {
    const serializedValues = finalSerializeValues(values);
    const serializedProps = finalSerializeValues(props);

    const finalErrors = Object.keys(validators).reduce((errors, fieldName) => {
      const parsedField = parseFieldName(fieldName);
      const validator = validators[parsedField.fullName];
      const value = serializedValues[parsedField.baseName];
      const finalAllValues = atRoot ? serializedValues : serializedProps;

      const errorMessage = parsedField.isArray
        ? (value || []).map(fieldValue => validator(fieldValue, finalAllValues, serializedProps))
        : validator(value, finalAllValues, serializedProps);

      if (errorMessage) {
        errors[parsedField.baseName] = errorMessage;
      }

      return errors;
    }, {});

    if (nullWhenValid && Object.keys(finalErrors).length === 0) {
      return null;
    }

    return finalErrors;
  };
}
