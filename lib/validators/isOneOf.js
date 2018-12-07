'use strict';

exports.__esModule = true;

var _findIndex = require('lodash/findIndex');

var _findIndex2 = _interopRequireDefault(_findIndex);

var _createValidatorFactory = require('../createValidatorFactory');

var _createValidatorFactory2 = _interopRequireDefault(_createValidatorFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultComparer = function (value, optionValue) {
  return value === optionValue;
};

exports.default = (0, _createValidatorFactory2.default)(function (message, values) {
  var comparer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultComparer;
  return function (value) {
    var valuesClone = values.slice(0);

    if (value === undefined) {
      return;
    }

    var valueIndex = (0, _findIndex2.default)(valuesClone, function (optionValue) {
      return comparer(value, optionValue);
    });

    if (valueIndex === -1) {
      return message;
    }
  };
}, function (field, values) {
  return field + ' must be one of ' + JSON.stringify(values.slice(0));
});