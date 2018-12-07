'use strict';

exports.__esModule = true;
exports.default = combineValidators;

var _internalCombineValidators = require('./internal/internalCombineValidators');

var _internalCombineValidators2 = _interopRequireDefault(_internalCombineValidators);

var _ensureNestedValidators = require('./internal/ensureNestedValidators');

var _ensureNestedValidators2 = _interopRequireDefault(_ensureNestedValidators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function combineValidators(validators, options) {
  var finalValidators = (0, _ensureNestedValidators2.default)(validators, options);
  return (0, _internalCombineValidators2.default)(finalValidators, true, options);
}