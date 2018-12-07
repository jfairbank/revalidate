'use strict';

exports.__esModule = true;

var _createValidator = require('../createValidator');

var _createValidator2 = _interopRequireDefault(_createValidator);

var _valueMissing = require('../internal/valueMissing');

var _valueMissing2 = _interopRequireDefault(_valueMissing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createValidator2.default)(function (message) {
  return function (value) {
    if ((0, _valueMissing2.default)(value)) {
      return message;
    }
  };
}, function (field) {
  return field + ' is required';
});