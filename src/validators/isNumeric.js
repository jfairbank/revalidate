// @flow
import internalMatchesPattern from '../internal/validators/internalMatchesPattern';

export default internalMatchesPattern(
  /^\d+$/,
  field => `${field} must be numeric`,
);
