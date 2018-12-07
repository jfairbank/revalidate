'use strict';

exports.__esModule = true;

var _createValidatorFactory = require('../createValidatorFactory');

var _createValidatorFactory2 = _interopRequireDefault(_createValidatorFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createValidatorFactory2.default)(function (message, max) {
  return function (value) {
    if (value && value.length >= max) {
      return message;
    }
  };
}, function (field, max) {
  return field + ' cannot be longer than ' + (max - 1) + ' characters';
});