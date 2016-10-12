import isPlainObject from 'lodash/isPlainObject';

import {
  hasError,
  hasErrorAt,
  hasErrorOnlyAt,
} from '../../src/assertions';

import {
  combinedValidator,
  composedValidator,
  multipleArrayComposedValidator,
  multipleObjectComposedValidator,
  singleRequiredValidator,
  validCombinedData,
} from './_helper';

it('true for shallow key when invalid and rest valid', () => {
  const result = combinedValidator({
    ...validCombinedData,
    favoriteMeme: '',
  });

  expect(hasErrorOnlyAt(result, 'favoriteMeme')).toBe(true);
});

it('false for shallow key when valid and rest valid', () => {
  const result = combinedValidator(validCombinedData);

  expect(hasErrorOnlyAt(result, 'favoriteMeme')).toBe(false);
});

it('false for shallow key when valid & another key is invalid', () => {
  const result = combinedValidator({
    ...validCombinedData,
    contact: {
      ...validCombinedData.contact,
      name: '',
    },
  });

  expect(hasError(result)).toBe(true);
  expect(hasErrorOnlyAt(result, 'favoriteMeme')).toBe(false);
});

it('false for shallow key when invalid & another key is invalid', () => {
  const result = combinedValidator({
    ...validCombinedData,
    contact: {
      ...validCombinedData.contact,
      name: '',
    },
    favoriteMeme: '',
  });

  expect(hasErrorAt(result, 'favoriteMeme')).toBe(true);
  expect(hasErrorOnlyAt(result, 'favoriteMeme')).toBe(false);
});

it('true for nested key when invalid & rest valid', () => {
  const result = combinedValidator({
    ...validCombinedData,
    contact: {
      ...validCombinedData.contact,
      name: '',
    },
  });

  expect(hasErrorOnlyAt(result, 'contact.name')).toBe(true);
});

it('false for nested key when valid & rest valid', () => {
  const result = combinedValidator(validCombinedData);

  expect(hasErrorOnlyAt(result, 'contact.name')).toBe(false);
});

it('false for nested key when valid & another key is invalid', () => {
  const result = combinedValidator({
    ...validCombinedData,
    contact: {
      ...validCombinedData.contact,
      age: '',
    },
  });

  expect(hasError(result)).toBe(true);
  expect(hasErrorOnlyAt(result, 'contact.name')).toBe(false);
});

it('false for nested key when invalid & another key is invalid', () => {
  const result = combinedValidator({
    ...validCombinedData,
    contact: {
      ...validCombinedData.contact,
      name: '',
      age: '',
    },
  });

  expect(hasErrorAt(result, 'contact.name')).toBe(true);
  expect(hasErrorOnlyAt(result, 'contact.name')).toBe(false);
});

it('true for key with multiple array errors when invalid & rest valid', () => {
  const result = combinedValidator({
    ...validCombinedData,
    phraseArray: 'BBB',
  });

  expect(Array.isArray(result.phraseArray)).toBe(true);
  expect(result.phraseArray.length).toBe(2);
  expect(hasErrorOnlyAt(result, 'phraseArray')).toBe(true);
});

it('false for key with multiple array errors when valid & rest valid', () => {
  const result = combinedValidator(validCombinedData);

  expect(Array.isArray(result.phraseArray)).toBe(true);
  expect(result.phraseArray.length).toBe(0);
  expect(hasErrorOnlyAt(result, 'phraseArray')).toBe(false);
});

it('false for key with multiple array errors when valid & another key is invalid', () => {
  const result = combinedValidator({
    ...validCombinedData,
    favoriteMeme: '',
  });

  expect(hasError(result)).toBe(true);
  expect(Array.isArray(result.phraseArray)).toBe(true);
  expect(result.phraseArray.length).toBe(0);
  expect(hasErrorOnlyAt(result, 'phraseArray')).toBe(false);
});

it('false for key with multiple array errors when invalid & another key is invalid', () => {
  const result = combinedValidator({
    ...validCombinedData,
    favoriteMeme: '',
    phraseArray: 'BBB',
  });

  expect(hasErrorAt(result, 'phraseArray')).toBe(true);
  expect(hasErrorOnlyAt(result, 'phraseArray')).toBe(false);
});

it('true for key with multiple object errors when invalid & rest valid', () => {
  const result = combinedValidator({
    ...validCombinedData,
    phraseObject: 'BBB',
  });

  expect(isPlainObject(result.phraseObject)).toBe(true);
  expect(Object.keys(result.phraseObject).length).toBe(2);
  expect(hasErrorOnlyAt(result, 'phraseObject')).toBe(true);
});

it('false for key with multiple object errors when valid & rest valid', () => {
  const result = combinedValidator(validCombinedData);

  expect(isPlainObject(result.phraseObject)).toBe(true);
  expect(Object.keys(result.phraseObject).length).toBe(0);
  expect(hasErrorOnlyAt(result, 'phraseObject')).toBe(false);
});

it('false for key with multiple object errors when valid & another key is invalid', () => {
  const result = combinedValidator({
    ...validCombinedData,
    favoriteMeme: '',
  });

  expect(hasError(result)).toBe(true);
  expect(isPlainObject(result.phraseObject)).toBe(true);
  expect(Object.keys(result.phraseObject).length).toBe(0);
  expect(hasErrorOnlyAt(result, 'phraseObject')).toBe(false);
});

it('false for key with multiple object errors when invalid & another key is invalid', () => {
  const result = combinedValidator({
    ...validCombinedData,
    favoriteMeme: '',
    phraseObject: 'BBB',
  });

  expect(hasErrorAt(result, 'phraseObject')).toBe(true);
  expect(hasErrorOnlyAt(result, 'phraseObject')).toBe(false);
});

it('does not check single validators', () => {
  expect(hasErrorOnlyAt(singleRequiredValidator(''))).toBe(false);
  expect(hasErrorOnlyAt(singleRequiredValidator('a'))).toBe(false);
});

it('does not check composed validators', () => {
  expect(hasErrorOnlyAt(composedValidator(''))).toBe(false);
  expect(hasErrorOnlyAt(composedValidator('1'))).toBe(false);
  expect(hasErrorOnlyAt(composedValidator('a'))).toBe(false);
});

it('does not check composed validators with multiple errors', () => {
  expect(hasErrorOnlyAt(multipleArrayComposedValidator(''))).toBe(false);
  expect(hasErrorOnlyAt(multipleArrayComposedValidator('1'))).toBe(false);
  expect(hasErrorOnlyAt(multipleArrayComposedValidator('a'))).toBe(false);

  expect(hasErrorOnlyAt(multipleObjectComposedValidator(''))).toBe(false);
  expect(hasErrorOnlyAt(multipleObjectComposedValidator('1'))).toBe(false);
  expect(hasErrorOnlyAt(multipleObjectComposedValidator('a'))).toBe(false);
});
