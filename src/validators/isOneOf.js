// @flow
import findIndex from 'lodash/findIndex';
import createValidatorFactory from '../createValidatorFactory';

const defaultComparer = (value: any, optionValue: any) => value === optionValue;

export default createValidatorFactory(
  (message, values: Array<any>, comparer: Comparer = defaultComparer) => value => {
    const valuesClone = values.slice(0);

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

  (field, values: Array<any>) => `${field} must be one of ${JSON.stringify(values.slice(0))}`,
);
