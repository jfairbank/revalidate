import assign from 'object-assign';
import omit from 'lodash.omit';
import createValidatorWithMultipleErrors from './createValidatorWithMultipleErrors';
import createValidatorWithSingleError from './createValidatorWithSingleError';

export default function composeValidators(...validators) {
  return function configurableValidators(sharedConfig) {
    let config;

    if (typeof sharedConfig === 'string') {
      config = { field: sharedConfig };
    } else {
      config = assign({}, sharedConfig);
    }

    if (config.multiple === true) {
      return createValidatorWithMultipleErrors(
        validators.slice(0),
        omit(config, 'multiple')
      );
    }

    return createValidatorWithSingleError(
      validators.slice(0),
      config
    );
  };
}
