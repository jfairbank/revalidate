// @flow
import { VALUE_VALIDATOR_SYMBOL } from './symbols';

export default function markAsValueValidator(
  valueValidator: ConfiguredValidator,
): ConfiguredValidator {
  valueValidator[VALUE_VALIDATOR_SYMBOL] = true;
  return valueValidator;
}
