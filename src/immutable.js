import originalCombineValidators from './combineValidators';

const OPTIONS = {
  serializeValues: values => values.toJS(),
};

export function combineValidators(validators) {
  return originalCombineValidators(validators, OPTIONS);
}
