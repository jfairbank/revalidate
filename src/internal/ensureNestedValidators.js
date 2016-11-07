// @flow
import assign from 'object-assign';
import fillObjectFromPath from './fillObjectFromPath';
import internalCombineNestedValidators from './internalCombineNestedValidators';

export default function ensureNestedValidators(
  validators: Object,
  options: CombineValidatorsOptions,
): Object {
  const baseShape = Object.keys(validators).reduce(
    (root, path) => assign(
      {},
      root,
      fillObjectFromPath(root, path.split('.'), validators[path]),
    ),
    {},
  );

  return internalCombineNestedValidators(baseShape, options);
}
