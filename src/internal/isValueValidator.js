// @flow
import { VALUE_VALIDATOR_SYMBOL } from './symbols';

export default function isValueValidator(validator: Validator): boolean {
  return validator[VALUE_VALIDATOR_SYMBOL] === true;
}
