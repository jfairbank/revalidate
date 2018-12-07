'use strict';

exports.__esModule = true;
exports.default = composeValidators;

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _createValidatorWithMultipleErrors = require('./internal/createValidatorWithMultipleErrors');

var _createValidatorWithMultipleErrors2 = _interopRequireDefault(_createValidatorWithMultipleErrors);

var _createValidatorWithSingleError = require('./internal/createValidatorWithSingleError');

var _createValidatorWithSingleError2 = _interopRequireDefault(_createValidatorWithSingleError);

var _markAsValueValidator = require('./internal/markAsValueValidator');

var _markAsValueValidator2 = _interopRequireDefault(_markAsValueValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function composeValidators(firstValidator) {
  for (var _len = arguments.length, validators = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    validators[_key - 1] = arguments[_key];
  }

  return function configurableValidators(sharedConfig) {
    var config = void 0;

    if (typeof sharedConfig === 'string') {
      config = { field: sharedConfig };
    } else {
      config = (0, _objectAssign2.default)({}, sharedConfig);
    }

    if (config.multiple === true) {
      return (0, _markAsValueValidator2.default)((0, _createValidatorWithMultipleErrors2.default)(firstValidator, validators.slice(0), (0, _omit2.default)(config, 'multiple')));
    }

    if (typeof firstValidator === 'object') {
      throw new Error('Please only pass in functions when composing ' + 'validators to produce a single error message.');
    }

    return (0, _markAsValueValidator2.default)((0, _createValidatorWithSingleError2.default)([firstValidator].concat(validators), config));
  };
}