'use strict';

exports.__esModule = true;
exports.default = fillObjectFromPath;

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fillObjectFromPath(object, path, finalValue) {
  var _assign;

  if (path.length <= 0) {
    return finalValue;
  }

  var head = path[0],
      tail = path.slice(1);


  return (0, _objectAssign2.default)({}, object, (_assign = {}, _assign[head] = fillObjectFromPath(object[head] || {}, tail, finalValue), _assign));
}