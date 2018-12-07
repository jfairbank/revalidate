'use strict';

exports.__esModule = true;

var _createValidatorFactory = require('../createValidatorFactory');

var _createValidatorFactory2 = _interopRequireDefault(_createValidatorFactory);

var _valueMissing = require('../internal/valueMissing');

var _valueMissing2 = _interopRequireDefault(_valueMissing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createValidatorFactory2.default)(function (message, condition) {
  return function (value, allValues) {
    if (condition(allValues) && (0, _valueMissing2.default)(value)) {
      return message;
    }
  };
}, function (field) {
  return field + ' is required';
});