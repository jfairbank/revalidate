import internalCombineValidators from './internal/internalCombineValidators';
import ensureNestedValidators from './internal/ensureNestedValidators';

export default function combineValidators(validators, options) {
  const finalValidators = ensureNestedValidators(validators, options);
  return internalCombineValidators(finalValidators, true, options);
}
