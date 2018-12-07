'use strict';

exports.__esModule = true;
exports.default = createValidatorWithMultipleErrors;

var _isValueValidator = require('./isValueValidator');

var _isValueValidator2 = _interopRequireDefault(_isValueValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateWithValidator(value, allValues, sharedConfig, validator) {
  if ((0, _isValueValidator2.default)(validator)) {
    return validator(value, allValues);
  }

  return validator(sharedConfig, value, allValues);
}
function createValidatorWithMultipleErrors(firstValidator, validators, sharedConfig) {
  if (typeof firstValidator === 'object') {
    return function composedValidator(value, allValues) {
      return Object.keys(firstValidator).reduce(function (errors, key) {
        var validator = firstValidator[key];

        var errorMessage = validateWithValidator(value, allValues, sharedConfig, validator);

        if (errorMessage) {
          errors[key] = errorMessage;
        }

        return errors;
      }, {});
    };
  }

  return function composedValidator(value, allValues) {
    return [firstValidator].concat(validators).reduce(function (errors, validator) {
      var errorMessage = validateWithValidator(value, allValues, sharedConfig, validator);

      if (errorMessage) {
        errors.push(errorMessage);
      }

      return errors;
    }, []);
  };
}