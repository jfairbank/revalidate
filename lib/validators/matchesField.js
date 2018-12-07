'use strict';

exports.__esModule = true;

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _createValidatorFactory = require('../createValidatorFactory');

var _createValidatorFactory2 = _interopRequireDefault(_createValidatorFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createValidatorFactory2.default)(function (message, otherField) {
  return function (value, allValues) {
    var otherValue = (0, _get2.default)(allValues, otherField);

    if (!allValues || value !== otherValue) {
      return message;
    }
  };
}, function (field, _, otherFieldLabel) {
  return field + ' must match ' + otherFieldLabel;
});