// @flow
import internalMatchesPattern from '../internal/validators/internalMatchesPattern';

export default function matchesPattern(
  regex: RegExp,
): ConfigurableValidator {
  const regexString = regex.toString();

  return internalMatchesPattern(
    regex,
    field => `${field} must match pattern ${regexString}`,
  );
}
