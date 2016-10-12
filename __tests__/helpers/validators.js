import { createValidator } from '../../src';

export const startsWithA = createValidator(
  message => value => {
    if (value && !/^A/.test(value)) {
      return message;
    }
  },

  field => `${field} must start with A`
);

export const endsWithC = createValidator(
  message => value => {
    if (value && !/C$/.test(value)) {
      return message;
    }
  },

  field => `${field} must end with C`
);
