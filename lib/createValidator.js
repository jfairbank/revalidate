'use strict';

exports.__esModule = true;
exports.default = createValidator;

var _markAsValueValidator = require('./internal/markAsValueValidator');

var _markAsValueValidator2 = _interopRequireDefault(_markAsValueValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getMessage(config, defaultMessageCreator) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  if (typeof config === 'object' && config != null) {
    if (typeof config.message === 'string') {
      return config.message;
    }

    if (typeof defaultMessageCreator === 'string') {
      return defaultMessageCreator;
    }

    if (config.field != null) {
      return defaultMessageCreator.apply(undefined, [config.field].concat(args));
    }
  }

  if (typeof defaultMessageCreator === 'string') {
    return defaultMessageCreator;
  }

  if (typeof config === 'string') {
    return defaultMessageCreator.apply(undefined, [config].concat(args));
  }

  throw new Error('Please provide a string or configuration object with a `field` or ' + '`message` property');
}
function createValidator(curriedDefinition, defaultMessageCreator) {
  for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    args[_key2 - 2] = arguments[_key2];
  }

  // Duplicated with createValidatorFactory for flow
  if (defaultMessageCreator == null || typeof defaultMessageCreator !== 'string' && typeof defaultMessageCreator !== 'function') {
    throw new Error('Please provide a message string or message creator function');
  }

  var finalMessageCreator = defaultMessageCreator;

  function clone(newDefaultMessageCreator) {
    return createValidator.apply(undefined, [curriedDefinition, newDefaultMessageCreator].concat(args));
  }

  function validator(config, value, allValues, idx) {
    var message = getMessage.apply(undefined, [config, finalMessageCreator].concat(args));
    var valueValidator = curriedDefinition.apply(undefined, [message].concat(args));

    if (arguments.length <= 1) {
      return (0, _markAsValueValidator2.default)(valueValidator);
    }

    return valueValidator(value, allValues, idx);
  }

  validator.clone = clone;

  return validator;
}