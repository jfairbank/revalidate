import internalCombineValidators from './internal/internalCombineValidators';
import ensureNestedValidators from './internal/ensureNestedValidators';

export default function combineValidators(validators) {
  const finalValidators = ensureNestedValidators(validators);
  return internalCombineValidators(finalValidators, true);
}
