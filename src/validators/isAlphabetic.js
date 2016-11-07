// @flow
import internalMatchesPattern from '../internal/validators/internalMatchesPattern';

export default internalMatchesPattern(
  /^[A-Za-z]+$/,
  field => `${field} must be alphabetic`,
);
