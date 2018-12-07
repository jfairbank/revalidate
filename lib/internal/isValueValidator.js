'use strict';

exports.__esModule = true;
exports.default = isValueValidator;

var _symbols = require('./symbols');

function isValueValidator(validator) {
  return validator[_symbols.VALUE_VALIDATOR_SYMBOL] === true;
}