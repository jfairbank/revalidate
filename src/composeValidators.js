import omit from 'lodash/omit';
import assign from 'object-assign';
import createValidatorWithMultipleErrors from './internal/createValidatorWithMultipleErrors';
import createValidatorWithSingleError from './internal/createValidatorWithSingleError';
import markAsValueValidator from './internal/markAsValueValidator';

export default function composeValidators(...validators) {
  return function configurableValidators(sharedConfig) {
    let config;

    if (typeof sharedConfig === 'string') {
      config = { field: sharedConfig };
    } else {
      config = assign({}, sharedConfig);
    }

    if (config.multiple === true) {
      return markAsValueValidator(createValidatorWithMultipleErrors(
        validators.slice(0),
        omit(config, 'multiple')
      ));
    }

    return markAsValueValidator(createValidatorWithSingleError(
      validators.slice(0),
      config
    ));
  };
}
