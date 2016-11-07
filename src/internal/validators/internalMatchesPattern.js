// @flow
import createValidator from '../../createValidator';

export default function internalMatchesPattern(
  regex: RegExp,
  messageCreator: MessageCreator,
): ConfigurableValidator {
  return createValidator(
    message => value => {
      if (value && !regex.test(value)) {
        return message;
      }
    },

    messageCreator,
  );
}
