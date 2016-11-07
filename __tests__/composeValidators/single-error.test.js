// @flow
import { startsWithA, endsWithC } from '../helpers/validators';

import {
  composeValidators,
  hasLengthBetween,
  isRequired,
} from '../../src';

const sharedValidator = composeValidators(
  startsWithA,
  endsWithC,
)('My Field');

it('stops on the first failure', () => {
  expect(sharedValidator('BBB')).toBe('My Field must start with A');
});

it('stops on the next failure', () => {
  expect(sharedValidator('ABB')).toBe('My Field must end with C');
});

it('validates a value that satisifes all validators', () => {
  expect(sharedValidator('ABC')).toEqual(undefined);
});

it('allows overriding messages per validator', () => {
  const messageForA = 'Missing A at start';
  const messageForC = 'Missing C at end';

  const validator = composeValidators(
    startsWithA({ message: messageForA }),
    endsWithC({ message: messageForC }),
  )('My Field');

  expect(validator('BBB')).toBe(messageForA);

  expect(validator('ABB')).toBe(messageForC);
});

// Silly, but it supports it
it('allows overriding field per validator', () => {
  const validator = composeValidators(
    startsWithA('My A Field'),
    endsWithC('My C Field'),
  )('My Field');

  expect(validator('BBB')).toBe('My A Field must start with A');

  expect(validator('ABB')).toBe('My C Field must end with C');
});

it('composed validators can be composed too', () => {
  const lengthValidator = composeValidators(
    sharedValidator,
    hasLengthBetween(1, 2),
  )('My Field Length');

  const requiredValidator = composeValidators(
    isRequired,
    lengthValidator,
  )('My Field Required');

  expect(requiredValidator()).toBe('My Field Required is required');
  expect(requiredValidator('ABC')).toBe('My Field Length must be between 1 and 2 characters long');
  expect(requiredValidator('BB')).toBe('My Field must start with A');
  expect(requiredValidator('AB')).toBe('My Field must end with C');
  expect(requiredValidator('AC')).toBe(undefined);
});

it('throws if attempting to use an object without multiple errors', () => {
  expect(_ => {
    composeValidators({
      required: isRequired,
    })();
  }).toThrowError(
    'Please only pass in functions when composing ' +
    'validators to produce a single error message.',
  );
});
