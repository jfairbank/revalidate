// @flow
import isPlainObject from 'lodash/isPlainObject';
import { hasError, hasErrorAt } from '../../src/assertions';

import {
  combinedValidator,
  singleRequiredValidator,
  validCombinedData,
} from './_helpers';

it('returns true for shallow key when invalid', () => {
  const result = combinedValidator({
    ...validCombinedData,
    favoriteMeme: '',
  });

  expect(hasErrorAt(result, 'favoriteMeme')).toBe(true);
});

it('returns false for shallow key when valid', () => {
  const result = combinedValidator(validCombinedData);

  expect(hasErrorAt(result, 'favoriteMeme')).toBe(false);
});

it('returns false for shallow key when another key is invalid', () => {
  const result = combinedValidator({
    ...validCombinedData,
    contact: {
      ...validCombinedData.contact,
      name: '',
    },
  });

  expect(hasError(result)).toBe(true);
  expect(hasErrorAt(result, 'favoriteMeme')).toBe(false);
});

it('returns true for nested key when invalid', () => {
  const result = combinedValidator({
    ...validCombinedData,
    contact: {
      ...validCombinedData.contact,
      name: '',
    },
  });

  expect(hasErrorAt(result, 'contact.name')).toBe(true);
});

it('returns false for nested key when valid', () => {
  const result = combinedValidator(validCombinedData);

  expect(hasErrorAt(result, 'contact.name')).toBe(false);
});

it('returns false for nested key when another key is invalid', () => {
  const result = combinedValidator({
    ...validCombinedData,
    contact: {
      ...validCombinedData.contact,
      age: '',
    },
  });

  expect(hasError(result)).toBe(true);
  expect(hasErrorAt(result, 'contact.name')).toBe(false);
});

it('returns true for key with multiple array errors', () => {
  const result = combinedValidator({
    ...validCombinedData,
    phraseArray: 'BBB',
  });

  expect(Array.isArray(result.phraseArray)).toBe(true);
  expect(result.phraseArray.length).toBe(2);
  expect(hasErrorAt(result, 'phraseArray')).toBe(true);
});

it('returns false for key with multiple array errors when valid', () => {
  const result = combinedValidator(validCombinedData);

  expect(Array.isArray(result.phraseArray)).toBe(true);
  expect(result.phraseArray.length).toBe(0);
  expect(hasErrorAt(result, 'phraseArray')).toBe(false);
});

it('returns false for key with multiple array errors when another key is invalid', () => {
  const result = combinedValidator({
    ...validCombinedData,
    favoriteMeme: '',
  });

  expect(hasError(result)).toBe(true);
  expect(Array.isArray(result.phraseArray)).toBe(true);
  expect(result.phraseArray.length).toBe(0);
  expect(hasErrorAt(result, 'phraseArray')).toBe(false);
});

it('returns true for key with multiple object errors', () => {
  const result = combinedValidator({
    ...validCombinedData,
    phraseObject: 'BBB',
  });

  expect(isPlainObject(result.phraseObject)).toBe(true);
  expect(Object.keys(result.phraseObject).length).toBe(2);
  expect(hasErrorAt(result, 'phraseObject')).toBe(true);
});

it('returns false for key with multiple object errors when valid', () => {
  const result = combinedValidator(validCombinedData);

  expect(isPlainObject(result.phraseObject)).toBe(true);
  expect(Object.keys(result.phraseObject).length).toBe(0);
  expect(hasErrorAt(result, 'phraseObject')).toBe(false);
});

it('returns false for key with multiple object errors when another key is invalid', () => {
  const result = combinedValidator({
    ...validCombinedData,
    favoriteMeme: '',
  });

  expect(hasError(result)).toBe(true);
  expect(isPlainObject(result.phraseObject)).toBe(true);
  expect(Object.keys(result.phraseObject).length).toBe(0);
  expect(hasErrorAt(result, 'phraseObject')).toBe(false);
});

it('does not check single validators', () => {
  expect(hasErrorAt(singleRequiredValidator(''))).toBe(false);
  expect(hasErrorAt(singleRequiredValidator('a'))).toBe(false);
});

it('throws if no key is provided', () => {
  const result = combinedValidator({
    ...validCombinedData,
    favoriteMeme: '',
  });

  expect(_ => {
    hasErrorAt(result);
  }).toThrowError(
    'Please provide a key to check for an error.',
  );
});
