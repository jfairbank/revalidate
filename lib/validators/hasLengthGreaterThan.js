'use strict';

exports.__esModule = true;

var _createValidatorFactory = require('../createValidatorFactory');

var _createValidatorFactory2 = _interopRequireDefault(_createValidatorFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createValidatorFactory2.default)(function (message, min) {
  return function (value) {
    if (value && value.length <= min) {
      return message;
    }
  };
}, function (field, min) {
  return field + ' must be longer than ' + min + ' characters';
});