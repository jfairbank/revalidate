import test from 'ava';
import { composeValidators } from '../../src';
import { startsWithA, endsWithC } from '../helpers/validators';

const messages = {
  startsWithA: 'Must start with A',
  endsWithC: 'Must end with C',
};

test('returns multiple errors as an array', t => {
  const validator = composeValidators(
    startsWithA,
    endsWithC
  )({ field: 'My Field', multiple: true });

  const result = validator('BBB');

  t.deepEqual(result, [
    'My Field must start with A',
    'My Field must end with C',
  ]);
});

test('returns multiple errors as an object', t => {
  const validator = composeValidators({
    A: startsWithA,
    C: endsWithC,
  })({ field: 'My Field', multiple: true });

  const result = validator('BBB');

  t.deepEqual(result, {
    A: 'My Field must start with A',
    C: 'My Field must end with C',
  });
});

test('returns an empty array if valid', t => {
  const validator = composeValidators(
    startsWithA,
    endsWithC
  )({ field: 'My Field', multiple: true });

  const result = validator('ABC');

  // Separately assert it's an array because `t.deepEqual([], {})` is true
  // right now in ava.
  // Reference: https://github.com/sotojuan/not-so-shallow/issues/4
  t.true(Array.isArray(result));
  t.deepEqual(result, []);
});

test('returns an empty object if valid', t => {
  const validator = composeValidators({
    A: startsWithA,
    C: endsWithC,
  })({ field: 'My Field', multiple: true });

  const result = validator('ABC');

  // Separately assert it's not an array because `t.deepEqual([], {})` is true
  // right now in ava.
  // Reference: https://github.com/sotojuan/not-so-shallow/issues/4
  t.false(Array.isArray(result));
  t.is(typeof result, 'object');
  t.deepEqual(result, {});
});

test('allows customizing individual validators with multiple errors', t => {
  const validator = composeValidators(
    startsWithA({ message: messages.startsWithA }),
    endsWithC({ message: messages.endsWithC })
  )({ multiple: true });

  const result = validator('BBB');

  t.deepEqual(result, [
    messages.startsWithA,
    messages.endsWithC,
  ]);
});
