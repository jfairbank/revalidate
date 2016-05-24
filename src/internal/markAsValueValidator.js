import { VALUE_VALIDATOR_SYMBOL } from './symbols';

export default function markAsValueValidator(valueValidator) {
  valueValidator[VALUE_VALIDATOR_SYMBOL] = true;
  return valueValidator;
}
