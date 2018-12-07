'use strict';

exports.__esModule = true;
exports.default = markAsValueValidator;

var _symbols = require('./symbols');

function markAsValueValidator(valueValidator) {
  valueValidator[_symbols.VALUE_VALIDATOR_SYMBOL] = true;
  return valueValidator;
}