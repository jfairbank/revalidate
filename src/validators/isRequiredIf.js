import invariant from 'invariant';
import createValidator from '../createValidator';
import valueMissing from '../internal/valueMissing';

export default function isRequiredIf(condition) {
  invariant(
    typeof condition === 'function',
    'Please provide a condition function to determine if a field should be required'
  );

  return createValidator(
    (message) => (value, allValues) => {
      if (condition(allValues) && valueMissing(value)) {
        return message;
      }
    },

    field => `${field} is required`
  );
}
