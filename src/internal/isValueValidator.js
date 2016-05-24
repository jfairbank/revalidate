import { VALUE_VALIDATOR_SYMBOL } from './symbols';

export default function isValueValidator(validator) {
  return validator[VALUE_VALIDATOR_SYMBOL] === true;
}
