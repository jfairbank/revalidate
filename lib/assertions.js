'use strict';

exports.__esModule = true;
exports.hasError = hasError;
exports.hasErrorAt = hasErrorAt;
exports.hasErrorOnlyAt = hasErrorOnlyAt;

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _unset = require('lodash/unset');

var _unset2 = _interopRequireDefault(_unset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hasError(result) {
  if (result == null) {
    return false;
  }

  if (Array.isArray(result)) {
    return result.some(function (item) {
      return hasError(item);
    });
  }

  if (typeof result === 'object') {
    return Object.keys(result).some(function (key) {
      return hasError(result[key]);
    });
  }

  return true;
}
function hasErrorAt(result, key) {
  if (result == null || typeof result !== 'object') {
    return false;
  }

  if (key == null) {
    throw new Error('Please provide a key to check for an error.');
  }

  return hasError((0, _get2.default)(result, key));
}

function hasErrorOnlyAt(result, key) {
  if (result == null || typeof result !== 'object') {
    return false;
  }

  if (key == null) {
    throw new Error('Please provide a key to check for an error.');
  }

  var omitted = (0, _cloneDeep2.default)(result);

  (0, _unset2.default)(omitted, key);

  return !hasError(omitted) && hasErrorAt(result, key);
}