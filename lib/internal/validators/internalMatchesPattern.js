'use strict';

exports.__esModule = true;
exports.validateMatchesPattern = validateMatchesPattern;
exports.default = internalMatchesPattern;

var _createValidator = require('../../createValidator');

var _createValidator2 = _interopRequireDefault(_createValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateMatchesPattern(regex, message, value) {
  if (value && !regex.test(value)) {
    return message;
  }
}
function internalMatchesPattern(regex, messageCreator) {
  return (0, _createValidator2.default)(function (message) {
    return function (value) {
      return validateMatchesPattern(regex, message, value);
    };
  }, messageCreator);
}