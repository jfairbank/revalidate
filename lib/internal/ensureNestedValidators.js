'use strict';

exports.__esModule = true;
exports.default = ensureNestedValidators;

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _fillObjectFromPath = require('./fillObjectFromPath');

var _fillObjectFromPath2 = _interopRequireDefault(_fillObjectFromPath);

var _internalCombineNestedValidators = require('./internalCombineNestedValidators');

var _internalCombineNestedValidators2 = _interopRequireDefault(_internalCombineNestedValidators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ensureNestedValidators(validators, options) {
  var baseShape = Object.keys(validators).reduce(function (root, path) {
    return (0, _objectAssign2.default)({}, root, (0, _fillObjectFromPath2.default)(root, path.split('.'), validators[path]));
  }, {});

  return (0, _internalCombineNestedValidators2.default)(baseShape, options);
}