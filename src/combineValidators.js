// @flow
import internalCombineValidators from './internal/internalCombineValidators';
import ensureNestedValidators from './internal/ensureNestedValidators';

export default function combineValidators(
  validators: Object,
  options: CombineValidatorsOptions,
): ConfiguredCombinedValidator {
  const finalValidators = ensureNestedValidators(validators, options);
  return internalCombineValidators(finalValidators, true, options);
}
