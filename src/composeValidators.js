// @flow
import omit from 'lodash/omit';
import assign from 'object-assign';
import createValidatorWithMultipleErrors from './internal/createValidatorWithMultipleErrors';
import createValidatorWithSingleError from './internal/createValidatorWithSingleError';
import markAsValueValidator from './internal/markAsValueValidator';

export default function composeValidators(
  firstValidator: Validator | Object,
  ...validators: Array<Validator>
): ComposedCurryableValidator {
  return function configurableValidators(sharedConfig?: string | ComposeConfig) {
    let config: ComposeConfig;

    if (typeof sharedConfig === 'string') {
      config = ({ field: sharedConfig }: ComposeConfig);
    } else {
      config = (assign({}, sharedConfig): ComposeConfig);
    }

    if (config.multiple === true) {
      return markAsValueValidator(createValidatorWithMultipleErrors(
        firstValidator,
        validators.slice(0),
        omit(config, 'multiple'),
      ));
    }

    if (typeof firstValidator === 'object') {
      throw new Error(
        'Please only pass in functions when composing ' +
        'validators to produce a single error message.',
      );
    }

    return markAsValueValidator(createValidatorWithSingleError(
      [firstValidator].concat(validators),
      config,
    ));
  };
}
