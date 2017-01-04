// @flow
import markAsValueValidator from './internal/markAsValueValidator';

function getMessage(
  config: ?string | ?Config,
  defaultMessageCreator: MessageCreator,
): mixed {
  if (typeof config === 'object' && config != null) {
    if (typeof config.message === 'string') {
      return config.message;
    }

    if (typeof defaultMessageCreator === 'string') {
      return defaultMessageCreator;
    }

    if (config.field != null) {
      return defaultMessageCreator(config.field);
    }
  }

  if (typeof defaultMessageCreator === 'string') {
    return defaultMessageCreator;
  }

  if (typeof config === 'string') {
    return defaultMessageCreator(config);
  }

  throw new Error(
    'Please provide a string or configuration object with a `field` or ' +
    '`message` property',
  );
}

export default function createValidator(
  curriedDefinition: ValidatorImpl,
  defaultMessageCreator?: MessageCreator,
): ConfigurableValidator {
  if (
    defaultMessageCreator == null ||
    (typeof defaultMessageCreator !== 'string' && typeof defaultMessageCreator !== 'function')
  ) {
    throw new Error('Please provide a message string or message creator function');
  }

  const finalMessageCreator = defaultMessageCreator;

  return function validator(config, value, allValues) {
    const message = getMessage(config, finalMessageCreator);
    const valueValidator = curriedDefinition(message);

    if (arguments.length <= 1) {
      return markAsValueValidator(valueValidator);
    }

    return valueValidator(value, allValues);
  };
}
