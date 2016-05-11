/* eslint semi:0 */
import invariant from 'invariant';
import isPlainObject from 'lodash.isplainobject';
import { markAsValueValidator } from './configureValueValidator';

export default function createValidator(curriedDefinition, defaultMessageCreator) {
  const messageCreatorIsString = typeof defaultMessageCreator === 'string';

  invariant(
    messageCreatorIsString || typeof defaultMessageCreator === 'function',
    'Please provide a message string or message creator function'
  );

  return function validator(config, value, allValues) {
    const configIsObject = isPlainObject(config);

    if (!messageCreatorIsString) {
      invariant(
        typeof config === 'string' || configIsObject,
        'Please provide a string or configuration object with a `field` or ' +
        '`message` property'
      );

      if (configIsObject) {
        invariant(
          'field' in config || 'message' in config,
          'Please provide a `field` or `message` property'
        );
      }
    }

    const message = do {
      if (configIsObject && 'message' in config)
        config.message
      else if (messageCreatorIsString)
        defaultMessageCreator
      else if (configIsObject)
        defaultMessageCreator(config.field)
      else
        defaultMessageCreator(config)
    };

    const valueValidator = curriedDefinition(message);

    if (arguments.length <= 1) {
      return markAsValueValidator(valueValidator);
    }

    return valueValidator(value, allValues);
  };
}
