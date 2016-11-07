// @flow
import findIndex from 'lodash/findIndex';
import createValidator from '../createValidator';

const defaultComparer = (value: any, optionValue: any) => value === optionValue;

export default function isOneOf<T>(
  values: Array<T>,
  comparer: Comparer = defaultComparer,
): ConfigurableValidator {
  const valuesClone = values.slice(0);

  return createValidator(
    message => (value: T) => {
      if (value === undefined) {
        return;
      }

      const valueIndex = findIndex(
        valuesClone,
        optionValue => comparer(value, optionValue),
      );

      if (valueIndex === -1) {
        return message;
      }
    },

    field => `${field} must be one of ${JSON.stringify(valuesClone)}`,
  );
}
