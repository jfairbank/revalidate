'use strict';

exports.__esModule = true;
exports.default = valueMissing;
function valueMissing(value) {
  return value == null || typeof value === 'string' && value.trim() === '';
}