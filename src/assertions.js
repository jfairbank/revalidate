// @flow
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';
import unset from 'lodash/unset';

export function hasError(result: any): boolean {
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

export function hasErrorAt(result: any, key?: string): boolean {
  if (result == null || typeof result !== 'object') {
    return false;
  }

  if (key == null) {
    throw new Error('Please provide a key to check for an error.');
  }

  return hasError(get(result, key));
}

export function hasErrorOnlyAt(result: any, key?: string): boolean {
  if (result == null || typeof result !== 'object') {
    return false;
  }

  if (key == null) {
    throw new Error('Please provide a key to check for an error.');
  }

  const omitted = cloneDeep(result);

  unset(omitted, key);

  return !hasError(omitted) && hasErrorAt(result, key);
}
