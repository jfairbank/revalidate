import findIndex from 'lodash.findindex';
import createValidator from '../createValidator';

const defaultComparer = (value, optionValue) => value === optionValue;

export default function isOneOf(values, comparer = defaultComparer) {
  const valuesClone = values.slice(0);

  return createValidator(
    message => value => {
      if (value === undefined) {
        return;
      }

      const valueIndex = findIndex(
        valuesClone,
        optionValue => comparer(value, optionValue)
      );

      if (valueIndex === -1) {
        return message;
      }
    },

    field => `${field} must be one of ${JSON.stringify(valuesClone)}`
  );
}
