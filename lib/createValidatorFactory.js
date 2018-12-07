'use strict';

exports.__esModule = true;
exports.default = createValidatorFactory;

var _createValidator = require('./createValidator');

var _createValidator2 = _interopRequireDefault(_createValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createValidatorFactory(curriedDefinition, defaultMessageCreator) {
  var finalCurriedDefinition = void 0;
  var finalMessageCreator = void 0;
  var numArgs = void 0;

  function helper(messageCreator, arity) {
    for (var _len = arguments.length, initialArgs = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      initialArgs[_key - 2] = arguments[_key];
    }

    function clone(newDefaultMessageCreator) {
      return helper.apply(undefined, [newDefaultMessageCreator, arity].concat(initialArgs));
    }

    function curried() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      if (args.length >= arity) {
        return _createValidator2.default.apply(undefined, [finalCurriedDefinition, messageCreator].concat(initialArgs, args));
      }

      return helper.apply(undefined, [messageCreator, arity - args.length].concat(args));
    }

    curried.clone = clone;

    return curried;
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
  if (finalMessageCreator == null || typeof finalMessageCreator !== 'string' && typeof finalMessageCreator !== 'function') {
    throw new Error('Please provide a message string or message creator function');
  }

  if (typeof numArgs === 'undefined') {
    numArgs = finalCurriedDefinition.length - 1;
  }

  return helper(finalMessageCreator, numArgs);
}