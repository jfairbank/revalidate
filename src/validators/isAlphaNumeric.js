// @flow
import internalMatchesPattern from '../internal/validators/internalMatchesPattern';

export default internalMatchesPattern(
  /^[0-9A-Za-z]+$/,
  field => `${field} must be alphanumeric`,
);
