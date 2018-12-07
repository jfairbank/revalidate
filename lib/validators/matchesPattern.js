'use strict';

exports.__esModule = true;

var _createValidatorFactory = require('../createValidatorFactory');

var _createValidatorFactory2 = _interopRequireDefault(_createValidatorFactory);

var _internalMatchesPattern = require('../internal/validators/internalMatchesPattern');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createValidatorFactory2.default)(function (message, regex) {
  return function (value) {
    return (0, _internalMatchesPattern.validateMatchesPattern)(regex, message, value);
  };
}, function (field, regex) {
  return field + ' must match pattern ' + regex.toString();
});