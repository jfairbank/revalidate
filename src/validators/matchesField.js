// @flow
import get from 'lodash/get';
import createValidator from '../createValidator';

export default function matchesField(
  otherField: string,
  otherFieldLabel: string,
): ConfigurableValidator {
  return createValidator(
    message => (value, allValues) => {
      const otherValue = get(allValues, otherField);

      if (!allValues || value !== otherValue) {
        return message;
      }
    },

    field => `${field} must match ${otherFieldLabel}`,
  );
}
