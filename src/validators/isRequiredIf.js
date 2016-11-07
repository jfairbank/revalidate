// @flow
import createValidator from '../createValidator';
import valueMissing from '../internal/valueMissing';

export default function isRequiredIf(
  condition: (allValues: ?Object) => boolean,
): ConfigurableValidator {
  return createValidator(
    (message) => (value, allValues) => {
      if (condition(allValues) && valueMissing(value)) {
        return message;
      }
    },

    field => `${field} is required`,
  );
}
