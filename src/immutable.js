// @flow
import originalCombineValidators from './combineValidators';

const OPTIONS: CombineValidatorsOptions = {
  serializeValues: (values: _Iterable<*, *, *, *, *>) => values.toJS(),
};

export function combineValidators(validators: Object): ConfiguredCombinedValidator {
  return originalCombineValidators(validators, OPTIONS);
}
