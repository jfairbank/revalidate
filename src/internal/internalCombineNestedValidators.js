// @flow
import internalCombineValidators from './internalCombineValidators';

export default function internalCombineNestedValidators(
  baseShape: Object,
  options: CombineValidatorsOptions,
): Object {
  return Object.keys(baseShape).reduce((memo, key) => {
    if (typeof baseShape[key] === 'object') {
      memo[key] = internalCombineValidators(
        internalCombineNestedValidators(baseShape[key], options),
        false,
        options,
      );
    } else {
      memo[key] = baseShape[key];
    }

    return memo;
  }, {});
}
