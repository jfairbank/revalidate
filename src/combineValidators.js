import internalCombineValidators from './internal/internalCombineValidators';
import ensureNestedValidators from './internal/ensureNestedValidators';

export default function combineValidators(validators, isImmutable) {
  const finalValidators = ensureNestedValidators(validators);
  return internalCombineValidators(finalValidators, true, isImmutable);
}
