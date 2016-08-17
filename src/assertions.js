import get from 'lodash.get';
import cloneDeep from 'lodash.clonedeep';
import unset from 'lodash.unset';

export function hasError(result) {
  if (result == null) {
    return false;
  }

  if (Array.isArray(result)) {
    return result.some(item => hasError(item));
  }

  if (typeof result === 'object') {
    return Object.keys(result).some(key => hasError(result[key]));
  }

  return true;
}

export function hasErrorAt(result, key) {
  if (result == null || typeof result !== 'object') {
    return false;
  }

  return hasError(get(result, key));
}

export function hasErrorOnlyAt(result, key) {
  const omitted = cloneDeep(result);

  unset(omitted, key);

  return !hasError(omitted) && hasErrorAt(result, key);
}
