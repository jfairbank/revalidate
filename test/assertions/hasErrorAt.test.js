import test from 'ava';
import isPlainObject from 'lodash.isplainobject';
import { hasError, hasErrorAt } from '../../src/assertions';

import {
  combinedValidator,
  composedValidator,
  multipleArrayComposedValidator,
  multipleObjectComposedValidator,
  singleRequiredValidator,
  validCombinedData,
} from './_helper';

test('returns true for shallow key when invalid', t => {
  const result = combinedValidator({
    ...validCombinedData,
    favoriteMeme: '',
  });

  t.true(hasErrorAt(result, 'favoriteMeme'));
});

test('returns false for shallow key when valid', t => {
  const result = combinedValidator(validCombinedData);

  t.false(hasErrorAt(result, 'favoriteMeme'));
});

test('returns false for shallow key when another key is invalid', t => {
  const result = combinedValidator({
    ...validCombinedData,
    contact: {
      ...validCombinedData.contact,
      name: '',
    },
  });

  t.true(hasError(result));
  t.false(hasErrorAt(result, 'favoriteMeme'));
});

test('returns true for nested key when invalid', t => {
  const result = combinedValidator({
    ...validCombinedData,
    contact: {
      ...validCombinedData.contact,
      name: '',
    },
  });

  t.true(hasErrorAt(result, 'contact.name'));
});

test('returns false for nested key when valid', t => {
  const result = combinedValidator(validCombinedData);

  t.false(hasErrorAt(result, 'contact.name'));
});

test('returns false for nested key when another key is invalid', t => {
  const result = combinedValidator({
    ...validCombinedData,
    contact: {
      ...validCombinedData.contact,
      age: '',
    },
  });

  t.true(hasError(result));
  t.false(hasErrorAt(result, 'contact.name'));
});

test('returns true for key with multiple array errors', t => {
  const result = combinedValidator({
    ...validCombinedData,
    phraseArray: 'BBB',
  });

  t.true(Array.isArray(result.phraseArray));
  t.is(result.phraseArray.length, 2);
  t.true(hasErrorAt(result, 'phraseArray'));
});

test('returns false for key with multiple array errors when valid', t => {
  const result = combinedValidator(validCombinedData);

  t.true(Array.isArray(result.phraseArray));
  t.is(result.phraseArray.length, 0);
  t.false(hasErrorAt(result, 'phraseArray'));
});

test('returns false for key with multiple array errors when another key is invalid', t => {
  const result = combinedValidator({
    ...validCombinedData,
    favoriteMeme: '',
  });

  t.true(hasError(result));
  t.true(Array.isArray(result.phraseArray));
  t.is(result.phraseArray.length, 0);
  t.false(hasErrorAt(result, 'phraseArray'));
});

test('returns true for key with multiple object errors', t => {
  const result = combinedValidator({
    ...validCombinedData,
    phraseObject: 'BBB',
  });

  t.true(isPlainObject(result.phraseObject));
  t.is(Object.keys(result.phraseObject).length, 2);
  t.true(hasErrorAt(result, 'phraseObject'));
});

test('returns false for key with multiple object errors when valid', t => {
  const result = combinedValidator(validCombinedData);

  t.true(isPlainObject(result.phraseObject));
  t.is(Object.keys(result.phraseObject).length, 0);
  t.false(hasErrorAt(result, 'phraseObject'));
});

test('returns false for key with multiple object errors when another key is invalid', t => {
  const result = combinedValidator({
    ...validCombinedData,
    favoriteMeme: '',
  });

  t.true(hasError(result));
  t.true(isPlainObject(result.phraseObject));
  t.is(Object.keys(result.phraseObject).length, 0);
  t.false(hasErrorAt(result, 'phraseObject'));
});

test('does not check single validators', t => {
  t.false(hasErrorAt(singleRequiredValidator('')));
  t.false(hasErrorAt(singleRequiredValidator('a')));
});

test('does not check composed validators', t => {
  t.false(hasErrorAt(composedValidator('')));
  t.false(hasErrorAt(composedValidator('1')));
  t.false(hasErrorAt(composedValidator('a')));
});

test('does not check composed validators with multiple errors', t => {
  t.false(hasErrorAt(multipleArrayComposedValidator('')));
  t.false(hasErrorAt(multipleArrayComposedValidator('1')));
  t.false(hasErrorAt(multipleArrayComposedValidator('a')));

  t.false(hasErrorAt(multipleObjectComposedValidator('')));
  t.false(hasErrorAt(multipleObjectComposedValidator('1')));
  t.false(hasErrorAt(multipleObjectComposedValidator('a')));
});
