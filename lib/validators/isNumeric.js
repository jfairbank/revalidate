'use strict';

exports.__esModule = true;

var _internalMatchesPattern = require('../internal/validators/internalMatchesPattern');

var _internalMatchesPattern2 = _interopRequireDefault(_internalMatchesPattern);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _internalMatchesPattern2.default)(/^\d+$/, function (field) {
  return field + ' must be numeric';
});