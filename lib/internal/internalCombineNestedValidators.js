'use strict';

exports.__esModule = true;
exports.default = internalCombineNestedValidators;

var _internalCombineValidators = require('./internalCombineValidators');

var _internalCombineValidators2 = _interopRequireDefault(_internalCombineValidators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function internalCombineNestedValidators(baseShape, options) {
  return Object.keys(baseShape).reduce(function (memo, key) {
    if (typeof baseShape[key] === 'object') {
      memo[key] = (0, _internalCombineValidators2.default)(internalCombineNestedValidators(baseShape[key], options), false, options);
    } else {
      memo[key] = baseShape[key];
    }

    return memo;
  }, {});
}