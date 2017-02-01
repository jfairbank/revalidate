// @flow
import createValidator from '../../createValidator';

export function validateMatchesPattern(regex: RegExp, message: any, value: string) {
  if (value && !regex.test(value)) {
    return message;
  }
}

export default function internalMatchesPattern(
  regex: RegExp,
  messageCreator: MessageCreator,
): ConfigurableValidator {
  return createValidator(
    message => value => validateMatchesPattern(regex, message, value),
    messageCreator,
  );
}
