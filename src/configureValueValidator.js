const VALUE_VALIDATOR_SYMBOL = typeof Symbol === 'function' ?
  Symbol('valueValidator') :
  '__revalidate_valueValidator__';

export function markAsValueValidator(valueValidator) {
  valueValidator[VALUE_VALIDATOR_SYMBOL] = true;
  return valueValidator;
}

export function isValueValidator(validator) {
  return validator[VALUE_VALIDATOR_SYMBOL] === true;
}
