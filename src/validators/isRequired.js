// @flow
import createValidator from '../createValidator';
import valueMissing from '../internal/valueMissing';

export default createValidator(
  message => value => {
    if (valueMissing(value)) {
      return message;
    }
  },

  field => `${field} is required`,
);
