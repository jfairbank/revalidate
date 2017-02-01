// @flow
import get from 'lodash/get';
import createValidatorFactory from '../createValidatorFactory';

export default createValidatorFactory(
  (message, otherField: string) => (value, allValues) => {
    const otherValue = get(allValues, otherField);

    if (!allValues || value !== otherValue) {
      return message;
    }
  },

  (field, _, otherFieldLabel: string) => `${field} must match ${otherFieldLabel}`,
);
