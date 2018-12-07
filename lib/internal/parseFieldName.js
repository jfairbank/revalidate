'use strict';

exports.__esModule = true;
exports.default = parseFieldName;
function parseFieldName(fieldName) {
  var isArray = fieldName.indexOf('[]') > -1;
  var baseName = isArray ? fieldName.replace('[]', '') : fieldName;

  return {
    isArray: isArray,
    baseName: baseName,
    fullName: fieldName
  };
}