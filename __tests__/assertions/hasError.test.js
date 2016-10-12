import { hasError } from '../../src/assertions';

import {
  combinedValidator,
  composedValidator,
  multipleArrayComposedValidator,
  multipleObjectComposedValidator,
  singleRequiredValidator,
  validCombinedData,
} from './_helper';

it('single validator when invalid returns true', () => {
  expect(hasError(singleRequiredValidator(''))).toBe(true);
});

it('single validator when valid returns false', () => {
  expect(hasError(singleRequiredValidator('a'))).toBe(false);
});

it('composed validator when invalid returns true', () => {
  expect(hasError(composedValidator(''))).toBe(true);
  expect(hasError(composedValidator('1'))).toBe(true);
});

it('composed validator when valid returns false', () => {
  expect(hasError(composedValidator('a'))).toBe(false);
});

it('multiple errors as array when invalid returns true', () => {
  expect(hasError(multipleArrayComposedValidator(''))).toBe(true);
  expect(hasError(multipleArrayComposedValidator('1'))).toBe(true);
});

it('multiple errors as array when valid returns false', () => {
  expect(hasError(multipleArrayComposedValidator('a'))).toBe(false);
});

it('multiple errors as object when invalid returns true', () => {
  expect(hasError(multipleObjectComposedValidator(''))).toBe(true);
  expect(hasError(multipleObjectComposedValidator('1'))).toBe(true);
});

it('multiple errors as object when valid returns false', () => {
  expect(hasError(multipleObjectComposedValidator('a'))).toBe(false);
});

it('combined validator when invalid returns true', () => {
  expect(hasError(combinedValidator({
    ...validCombinedData,
    contact: {
      ...validCombinedData.contact,
      name: '',
    },
  }))).toBe(true);

  expect(hasError(combinedValidator({
    ...validCombinedData,
    contact: {
      ...validCombinedData.contact,
      age: '',
    },
  }))).toBe(true);

  expect(hasError(combinedValidator({
    ...validCombinedData,
    contact: {
      ...validCombinedData.contact,
      age: 'a',
    },
  }))).toBe(true);

  expect(hasError(combinedValidator({
    ...validCombinedData,
    favoriteMeme: '',
  }))).toBe(true);

  expect(hasError(combinedValidator({
    ...validCombinedData,
    phraseArray: 'BBB',
  }))).toBe(true);

  expect(hasError(combinedValidator({
    ...validCombinedData,
    phraseObject: 'BBB',
  }))).toBe(true);
});

it('combined validator when valid returns false', () => {
  expect(hasError(combinedValidator(validCombinedData))).toBe(false);
});
