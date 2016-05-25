import createValidator from '../createValidator';

export default function matchesField(otherField, otherFieldLabel) {
  return createValidator(
    message => (value, allValues) => {
      if (!allValues || value !== allValues[otherField]) {
        return message;
      }
    },

    field => `${field} must match ${otherFieldLabel}`
  );
}
