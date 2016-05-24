import internalCombineValidators from './internalCombineValidators';

export default function internalCombineNestedValidators(baseShape) {
  return Object.keys(baseShape).reduce((memo, key) => {
    if (typeof baseShape[key] === 'object') {
      memo[key] = internalCombineValidators(
        internalCombineNestedValidators(baseShape[key])
      );
    } else {
      memo[key] = baseShape[key];
    }

    return memo;
  }, {});
}
