import fillObjectFromPath from './fillObjectFromPath';
import internalCombineNestedValidators from './internalCombineNestedValidators';

export default function ensureNestedValidators(validators) {
  const baseShape = Object.keys(validators).reduce((root, path) => ({
    ...root,
    ...fillObjectFromPath(root, path.split('.'), validators[path]),
  }), {});

  return internalCombineNestedValidators(baseShape);
}
