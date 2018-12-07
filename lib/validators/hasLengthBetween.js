'use strict';

exports.__esModule = true;

var _createValidatorFactory = require('../createValidatorFactory');

var _createValidatorFactory2 = _interopRequireDefault(_createValidatorFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createValidatorFactory2.default)(function (message, min, max) {
  return function (value) {
    if (value && (value.length < min || value.length > max)) {
      return message;
    }
  };
}, function (field, min, max) {
  return field + ' must be between ' + min + ' and ' + max + ' characters long';
});