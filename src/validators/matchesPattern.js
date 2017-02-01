// @flow
import createValidatorFactory from '../createValidatorFactory';
import { validateMatchesPattern } from '../internal/validators/internalMatchesPattern';

export default createValidatorFactory(
  (message, regex: RegExp) => (value) => validateMatchesPattern(regex, message, value),
  (field, regex: RegExp) => `${field} must match pattern ${regex.toString()}`,
);
