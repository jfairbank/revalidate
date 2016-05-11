import createValidator from '../createValidator';

export default function matchesValue(matchKey, matchLabel) {
  return createValidator(
    message => (value, allValues) => {
      if (value !== allValues[matchKey]) {
        return message;
      }
    },

    field => `${field} must match ${matchLabel}`
  );
}
