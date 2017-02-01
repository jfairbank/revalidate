// @flow
import createValidatorFactory from '../createValidatorFactory';
import valueMissing from '../internal/valueMissing';

export default createValidatorFactory(
  (message, condition: (any) => boolean) => (value, allValues) => {
    if (condition(allValues) && valueMissing(value)) {
      return message;
    }
  },

  field => `${field} is required`,
);
