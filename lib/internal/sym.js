'use strict';

exports.__esModule = true;
var sym = typeof Symbol === 'function' ? Symbol : function (id) {
  return '@@revalidate/' + id;
};

exports.default = sym;