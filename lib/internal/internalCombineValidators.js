'use strict';

exports.__esModule = true;
exports.default = internalCombineValidators;

var _parseFieldName = require('./parseFieldName');

var _parseFieldName2 = _interopRequireDefault(_parseFieldName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function defaultSerializeValues(values) {
  return values;
}
function internalCombineValidators(validators, atRoot) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var serializeValues = atRoot && typeof options.serializeValues === 'function' ? options.serializeValues : defaultSerializeValues;

  var nullWhenValid = atRoot && options.nullWhenValid === true;

  function finalSerializeValues(values) {
    if (values == null) {
      return {};
    }

    return serializeValues(values) || {};
  }

  return function valuesValidator(values, allValues, idx) {
    var serializedValues = finalSerializeValues(values);
    var serializedAllValues = finalSerializeValues(allValues);

    var finalErrors = Object.keys(validators).reduce(function (errors, fieldName) {
      var parsedField = (0, _parseFieldName2.default)(fieldName);
      var validator = validators[parsedField.fullName];
      var value = serializedValues[parsedField.baseName];
      var finalAllValues = atRoot ? serializedValues : serializedAllValues;

      var errorMessage = parsedField.isArray ? (value || []).map(function (fieldValue, idx) {
        return validator(fieldValue, finalAllValues, idx);
      }) : validator(value, finalAllValues, idx);

      if (errorMessage) {
        errors[parsedField.baseName] = errorMessage;
      }

      return errors;
    }, {});

    if (nullWhenValid && Object.keys(finalErrors).length === 0) {
      return null;
    }

    return finalErrors;
  };
}