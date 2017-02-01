// @flow
import curry from 'lodash/curry';
import createValidator from './createValidator';

export default function createValidatorFactory(
  curriedDefinition: ValidatorImpl | ValidatorFactoryConfig,
  defaultMessageCreator?: MessageCreator,
): ValidatorFactory {
  let finalCurriedDefinition;
  let finalMessageCreator;
  let numArgs;

  if (typeof curriedDefinition === 'function') {
    finalCurriedDefinition = curriedDefinition;
    finalMessageCreator = defaultMessageCreator;
  } else {
    finalCurriedDefinition = curriedDefinition.definition;
    finalMessageCreator = curriedDefinition.messageCreator;
    numArgs = curriedDefinition.numArgs;
  }

  // Duplicated with createValidator for flow
  if (
    finalMessageCreator == null ||
    (typeof finalMessageCreator !== 'string' && typeof finalMessageCreator !== 'function')
  ) {
    throw new Error('Please provide a message string or message creator function');
  }

  if (typeof numArgs === 'undefined') {
    numArgs = finalCurriedDefinition.length - 1;
  }

  return curry((...args) => (
    createValidator(finalCurriedDefinition, finalMessageCreator, ...args)
  ), numArgs);
}
