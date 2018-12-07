'use strict';

exports.__esModule = true;
exports.combineValidators = combineValidators;

var _combineValidators = require('./combineValidators');

var _combineValidators2 = _interopRequireDefault(_combineValidators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OPTIONS = {
  serializeValues: function (values) {
    return values.toJS();
  }
};
function combineValidators(validators) {
  return (0, _combineValidators2.default)(validators, OPTIONS);
}