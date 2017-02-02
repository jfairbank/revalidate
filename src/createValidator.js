// @flow
import markAsValueValidator from './internal/markAsValueValidator';

function getMessage(
  config: ?string | ?Config,
  defaultMessageCreator: MessageCreator,
  ...args: Array<any>
): mixed {
  if (typeof config === 'object' && config != null) {
    if (typeof config.message === 'string') {
      return config.message;
    }

    if (typeof defaultMessageCreator === 'string') {
      return defaultMessageCreator;
    }

    if (config.field != null) {
      return defaultMessageCreator(config.field, ...args);
    }
  }

  if (typeof defaultMessageCreator === 'string') {
    return defaultMessageCreator;
  }

  if (typeof config === 'string') {
    return defaultMessageCreator(config, ...args);
  }

  throw new Error(
    'Please provide a string or configuration object with a `field` or ' +
    '`message` property',
  );
}

export default function createValidator(
  curriedDefinition: ValidatorImpl,
  defaultMessageCreator?: MessageCreator,
  ...args: Array<any>
): ConfigurableValidator {
  // Duplicated with createValidatorFactory for flow
  if (
    defaultMessageCreator == null ||
    (typeof defaultMessageCreator !== 'string' && typeof defaultMessageCreator !== 'function')
  ) {
    throw new Error('Please provide a message string or message creator function');
  }

  const finalMessageCreator = defaultMessageCreator;

  function clone(newDefaultMessageCreator) {
    return createValidator(curriedDefinition, newDefaultMessageCreator, ...args);
  }

  function validator(config, value, allValues) {
    const message = getMessage(config, finalMessageCreator, ...args);
    const valueValidator = curriedDefinition(message, ...args);

    if (arguments.length <= 1) {
      return markAsValueValidator(valueValidator);
    }

    return valueValidator(value, allValues);
  }

  validator.clone = clone;

  return validator;
}
