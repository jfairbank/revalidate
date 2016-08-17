import test from 'ava';
import { hasError } from '../../src/assertions';

import {
  combinedValidator,
  composedValidator,
  multipleArrayComposedValidator,
  multipleObjectComposedValidator,
  singleRequiredValidator,
  validCombinedData,
} from './_helper';

test('single validator when invalid returns true', t => {
  t.true(hasError(singleRequiredValidator('')));
});

test('single validator when valid returns false', t => {
  t.false(hasError(singleRequiredValidator('a')));
});

test('composed validator when invalid returns true', t => {
  t.true(hasError(composedValidator('')));
  t.true(hasError(composedValidator('1')));
});

test('composed validator when valid returns false', t => {
  t.false(hasError(composedValidator('a')));
});

test('multiple errors as array when invalid returns true', t => {
  t.true(hasError(multipleArrayComposedValidator('')));
  t.true(hasError(multipleArrayComposedValidator('1')));
});

test('multiple errors as array when valid returns false', t => {
  t.false(hasError(multipleArrayComposedValidator('a')));
});

test('multiple errors as object when invalid returns true', t => {
  t.true(hasError(multipleObjectComposedValidator('')));
  t.true(hasError(multipleObjectComposedValidator('1')));
});

test('multiple errors as object when valid returns false', t => {
  t.false(hasError(multipleObjectComposedValidator('a')));
});

test('combined validator when invalid returns true', t => {
  t.true(
    hasError(combinedValidator({
      ...validCombinedData,
      contact: {
        ...validCombinedData.contact,
        name: '',
      },
    }))
  );

  t.true(
    hasError(combinedValidator({
      ...validCombinedData,
      contact: {
        ...validCombinedData.contact,
        age: '',
      },
    }))
  );

  t.true(
    hasError(combinedValidator({
      ...validCombinedData,
      contact: {
        ...validCombinedData.contact,
        age: 'a',
      },
    }))
  );

  t.true(
    hasError(combinedValidator({
      ...validCombinedData,
      favoriteMeme: '',
    }))
  );

  t.true(
    hasError(combinedValidator({
      ...validCombinedData,
      phraseArray: 'BBB',
    }))
  );

  t.true(
    hasError(combinedValidator({
      ...validCombinedData,
      phraseObject: 'BBB',
    }))
  );
});

test('combined validator when valid returns false', t => {
  t.false(
    hasError(combinedValidator(validCombinedData))
  );
});
