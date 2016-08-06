import internalMatchesPattern from '../internal/validators/internalMatchesPattern';

export default function matchesPattern(regex) {
  return internalMatchesPattern(
    regex,
    field => `${field} must match pattern ${regex}`
  );
}
