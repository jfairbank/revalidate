// @flow
import createValidator from './createValidator';

export default function createValidatorFactory(
  curriedDefinition: ValidatorImpl | ValidatorFactoryConfig,
  defaultMessageCreator?: MessageCreator,
): ValidatorFactory {
  let finalCurriedDefinition;
  let finalMessageCreator;
  let numArgs;

  function helper(
    messageCreator?: MessageCreator,
    arity: number,
    ...initialArgs: Array<any>
  ): ValidatorFactory | ConfigurableValidator {
    function clone(newDefaultMessageCreator?: MessageCreator): ValidatorFactory {
      return helper(newDefaultMessageCreator, arity, ...initialArgs);
    }

    function curried(...args: Array<any>): ValidatorFactory | ConfigurableValidator {
      if (args.length >= arity) {
        return createValidator(finalCurriedDefinition, messageCreator, ...initialArgs, ...args);
      }

      return helper(messageCreator, arity - args.length, ...args);
    }

    curried.clone = clone;

    return (curried: ValidatorFactory);
  }

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

  return helper(finalMessageCreator, numArgs);
}
