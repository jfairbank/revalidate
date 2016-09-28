import test from 'ava';
import { startsWithA, endsWithC } from '../helpers/validators';

import {
  composeValidators,
  hasLengthBetween,
  isRequired,
} from '../../src';

const sharedValidator = composeValidators(
  startsWithA,
  endsWithC
)('My Field');

test('stops on the first failure', t => {
  t.is(
    sharedValidator('BBB'),
    'My Field must start with A'
  );
});

test('stops on the next failure', t => {
  t.is(
    sharedValidator('ABB'),
    'My Field must end with C'
  );
});

test('validates a value that satisifes all validators', t => {
  t.deepEqual(
    sharedValidator('ABC'),
    undefined
  );
});

test('allows overriding messages per validator', t => {
  const messageForA = 'Missing A at start';
  const messageForC = 'Missing C at end';

  const validator = composeValidators(
    startsWithA({ message: messageForA }),
    endsWithC({ message: messageForC })
  )('My Field');

  t.is(
    validator('BBB'),
    messageForA
  );

  t.is(
    validator('ABB'),
    messageForC
  );
});

// Silly, but it supports it
test('allows overriding field per validator', t => {
  const validator = composeValidators(
    startsWithA('My A Field'),
    endsWithC('My C Field')
  )('My Field');

  t.is(
    validator('BBB'),
    'My A Field must start with A'
  );

  t.is(
    validator('ABB'),
    'My C Field must end with C'
  );
});

test('composed validators can be composed too', t => {
  const lengthValidator = composeValidators(
    sharedValidator,
    hasLengthBetween(1, 2)
  )('My Field Length');

  const requiredValidator = composeValidators(
    isRequired,
    lengthValidator
  )('My Field Required');

  t.is(
    requiredValidator(),
    'My Field Required is required'
  );

  t.is(
    requiredValidator('ABC'),
    'My Field Length must be between 1 and 2 characters long'
  );

  t.is(
    requiredValidator('BB'),
    'My Field must start with A'
  );

  t.is(
    requiredValidator('AB'),
    'My Field must end with C'
  );

  t.is(
    requiredValidator('AC'),
    undefined
  );
});
