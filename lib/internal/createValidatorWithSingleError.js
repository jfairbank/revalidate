'use strict';

exports.__esModule = true;
exports.default = createValidatorWithSingleError;

var _isValueValidator = require('./isValueValidator');

var _isValueValidator2 = _interopRequireDefault(_isValueValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createValidatorWithSingleError(validators, sharedConfig) {
  return function composedValidator(value, allValues, idx) {
    for (var i = 0, l = validators.length; i < l; i++) {
      var validator = validators[i];
      var errorMessage = void 0;

      if ((0, _isValueValidator2.default)(validator)) {
        errorMessage = validator(value, allValues, idx);
      } else {
        errorMessage = validator(sharedConfig, value, allValues, idx);
      }

      if (errorMessage) {
        return errorMessage;
      }
    }
  };
}