import test from 'ava';

import {
  combineValidators,
  composeValidators,
  isAlphabetic,
  isNumeric,
  isRequired,
  isRequiredIf,
  matchesField,
} from '../../src';

const validatePerson = combineValidators({
  name: composeValidators(
    isRequired,
    isAlphabetic
  )('Name'),

  confirmName: matchesField('name')({ message: 'Confirm Your Name' }),
  age: isNumeric('Age'),

  job: isRequiredIf(
    values => values && Number(values.age) >= 18
  )('Job'),
});

test('returns an empty object for valid fields', t => {
  const result = validatePerson({
    name: 'Jeremy',
    confirmName: 'Jeremy',
    age: '29',
    job: 'Developer',
  });

  t.deepEqual(result, {});
});

test('returns non empty object with error message for invalid age', t => {
  const errorMessages = validatePerson({
    name: 'Jeremy',
    confirmName: 'Jeremy',
    age: 'abc',
  });

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
  const errorMessages = validatePerson({
    name: '123',
    confirmName: 'Jeremy',
    age: 'abc',
  });

  t.is(Object.keys(errorMessages).length, 3);

  t.is(typeof errorMessages.name, 'string');
  t.is(typeof errorMessages.confirmName, 'string');
  t.is(typeof errorMessages.age, 'string');

  t.true(errorMessages.name.length > 1);
  t.true(errorMessages.confirmName.length > 1);
  t.true(errorMessages.age.length > 1);
});

test('returns non empty object with error message for job if it\'s required', t => {
  const errorMessages = validatePerson({
    name: 'Jeremy',
    confirmName: 'Jeremy',
    age: '18',
  });

  t.is(Object.keys(errorMessages).length, 1);
  t.is(typeof errorMessages.job, 'string');
  t.true(errorMessages.job.length > 1);
});

test('returns empty object if job is not required', t => {
  const result = validatePerson({
    name: 'Jeremy',
    confirmName: 'Jeremy',
    age: '17',
  });

  t.deepEqual(result, {});
});
