import test from 'ava';
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

test('true for shallow key when invalid and rest valid', t => {
  const result = combinedValidator({
    ...validCombinedData,
    favoriteMeme: '',
  });

  t.true(hasErrorOnlyAt(result, 'favoriteMeme'));
});

test('false for shallow key when valid and rest valid', t => {
  const result = combinedValidator(validCombinedData);

  t.false(hasErrorOnlyAt(result, 'favoriteMeme'));
});

test('false for shallow key when valid & another key is invalid', t => {
  const result = combinedValidator({
    ...validCombinedData,
    contact: {
      ...validCombinedData.contact,
      name: '',
    },
  });

  t.true(hasError(result));
  t.false(hasErrorOnlyAt(result, 'favoriteMeme'));
});

test('false for shallow key when invalid & another key is invalid', t => {
  const result = combinedValidator({
    ...validCombinedData,
    contact: {
      ...validCombinedData.contact,
      name: '',
    },
    favoriteMeme: '',
  });

  t.true(hasErrorAt(result, 'favoriteMeme'));
  t.false(hasErrorOnlyAt(result, 'favoriteMeme'));
});

test('true for nested key when invalid & rest valid', t => {
  const result = combinedValidator({
    ...validCombinedData,
    contact: {
      ...validCombinedData.contact,
      name: '',
    },
  });

  t.true(hasErrorOnlyAt(result, 'contact.name'));
});

test('false for nested key when valid & rest valid', t => {
  const result = combinedValidator(validCombinedData);

  t.false(hasErrorOnlyAt(result, 'contact.name'));
});

test('false for nested key when valid & another key is invalid', t => {
  const result = combinedValidator({
    ...validCombinedData,
    contact: {
      ...validCombinedData.contact,
      age: '',
    },
  });

  t.true(hasError(result));
  t.false(hasErrorOnlyAt(result, 'contact.name'));
});

test('false for nested key when invalid & another key is invalid', t => {
  const result = combinedValidator({
    ...validCombinedData,
    contact: {
      ...validCombinedData.contact,
      name: '',
      age: '',
    },
  });

  t.true(hasErrorAt(result, 'contact.name'));
  t.false(hasErrorOnlyAt(result, 'contact.name'));
});

test('true for key with multiple array errors when invalid & rest valid', t => {
  const result = combinedValidator({
    ...validCombinedData,
    phraseArray: 'BBB',
  });

  t.true(Array.isArray(result.phraseArray));
  t.is(result.phraseArray.length, 2);
  t.true(hasErrorOnlyAt(result, 'phraseArray'));
});

test('false for key with multiple array errors when valid & rest valid', t => {
  const result = combinedValidator(validCombinedData);

  t.true(Array.isArray(result.phraseArray));
  t.is(result.phraseArray.length, 0);
  t.false(hasErrorOnlyAt(result, 'phraseArray'));
});

test('false for key with multiple array errors when valid & another key is invalid', t => {
  const result = combinedValidator({
    ...validCombinedData,
    favoriteMeme: '',
  });

  t.true(hasError(result));
  t.true(Array.isArray(result.phraseArray));
  t.is(result.phraseArray.length, 0);
  t.false(hasErrorOnlyAt(result, 'phraseArray'));
});

test('false for key with multiple array errors when invalid & another key is invalid', t => {
  const result = combinedValidator({
    ...validCombinedData,
    favoriteMeme: '',
    phraseArray: 'BBB',
  });

  t.true(hasErrorAt(result, 'phraseArray'));
  t.false(hasErrorOnlyAt(result, 'phraseArray'));
});

test('true for key with multiple object errors when invalid & rest valid', t => {
  const result = combinedValidator({
    ...validCombinedData,
    phraseObject: 'BBB',
  });

  t.true(isPlainObject(result.phraseObject));
  t.is(Object.keys(result.phraseObject).length, 2);
  t.true(hasErrorOnlyAt(result, 'phraseObject'));
});

test('false for key with multiple object errors when valid & rest valid', t => {
  const result = combinedValidator(validCombinedData);

  t.true(isPlainObject(result.phraseObject));
  t.is(Object.keys(result.phraseObject).length, 0);
  t.false(hasErrorOnlyAt(result, 'phraseObject'));
});

test('false for key with multiple object errors when valid & another key is invalid', t => {
  const result = combinedValidator({
    ...validCombinedData,
    favoriteMeme: '',
  });

  t.true(hasError(result));
  t.true(isPlainObject(result.phraseObject));
  t.is(Object.keys(result.phraseObject).length, 0);
  t.false(hasErrorOnlyAt(result, 'phraseObject'));
});

test('false for key with multiple object errors when invalid & another key is invalid', t => {
  const result = combinedValidator({
    ...validCombinedData,
    favoriteMeme: '',
    phraseObject: 'BBB',
  });

  t.true(hasErrorAt(result, 'phraseObject'));
  t.false(hasErrorOnlyAt(result, 'phraseObject'));
});

test('does not check single validators', t => {
  t.false(hasErrorOnlyAt(singleRequiredValidator('')));
  t.false(hasErrorOnlyAt(singleRequiredValidator('a')));
});

test('does not check composed validators', t => {
  t.false(hasErrorOnlyAt(composedValidator('')));
  t.false(hasErrorOnlyAt(composedValidator('1')));
  t.false(hasErrorOnlyAt(composedValidator('a')));
});

test('does not check composed validators with multiple errors', t => {
  t.false(hasErrorOnlyAt(multipleArrayComposedValidator('')));
  t.false(hasErrorOnlyAt(multipleArrayComposedValidator('1')));
  t.false(hasErrorOnlyAt(multipleArrayComposedValidator('a')));

  t.false(hasErrorOnlyAt(multipleObjectComposedValidator('')));
  t.false(hasErrorOnlyAt(multipleObjectComposedValidator('1')));
  t.false(hasErrorOnlyAt(multipleObjectComposedValidator('a')));
});
