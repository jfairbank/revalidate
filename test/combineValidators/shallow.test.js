import test from 'ava';

import {
  composeValidators,
  combineValidators,
  isRequired,
  isAlphabetic,
  isNumeric,
  matchesField,
} from '../../src';

const validatePerson = combineValidators({
  name: composeValidators(
    isRequired,
    isAlphabetic
  )('Name'),

  confirmName: matchesField('name')({ message: 'Confirm Your Name' }),
  age: isNumeric('Age'),
});

test('returns an empty object for valid fields', t => {
  t.deepEqual(
    validatePerson({ name: 'Jeremy', confirmName: 'Jeremy', age: '29' }),
    {}
  );
});

test('returns non empty object with error message for invalid age', t => {
  const errorMessages = validatePerson({ name: 'Jeremy', confirmName: 'Jeremy', age: 'abc' });

  t.is(Object.keys(errorMessages).length, 1);
  t.is(typeof errorMessages.age, 'string');
  t.true(errorMessages.age.length > 1);
});

test('returns non empty object with error message for missing name', t => {
  const errorMessages = validatePerson({});

  t.is(Object.keys(errorMessages).length, 1);
  t.is(typeof errorMessages.name, 'string');
  t.true(errorMessages.name.length > 1);
});

test('handles validating missing object', t => {
  const errorMessages = validatePerson();

  t.is(Object.keys(errorMessages).length, 1);
  t.is(typeof errorMessages.name, 'string');
  t.true(errorMessages.name.length > 1);
});

test('returns non empty object with error message for invalid name', t => {
  const errorMessages = validatePerson({ name: '123' });

  t.is(Object.keys(errorMessages).length, 2);
  t.is(typeof errorMessages.name, 'string');
  t.true(errorMessages.name.length > 1);
});

test('returns non empty object with error messages for invalid fields', t => {
  const errorMessages = validatePerson({ name: '123', confirmName: 'Jeremy', age: 'abc' });

  t.is(Object.keys(errorMessages).length, 3);

  t.is(typeof errorMessages.name, 'string');
  t.is(typeof errorMessages.confirmName, 'string');
  t.is(typeof errorMessages.age, 'string');

  t.true(errorMessages.name.length > 1);
  t.true(errorMessages.confirmName.length > 1);
  t.true(errorMessages.age.length > 1);
});
