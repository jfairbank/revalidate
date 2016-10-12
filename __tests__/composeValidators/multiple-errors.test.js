import { composeValidators } from '../../src';
import { startsWithA, endsWithC } from '../helpers/validators';

const messages = {
  startsWithA: 'Must start with A',
  endsWithC: 'Must end with C',
};

it('returns multiple errors as an array', () => {
  const validator = composeValidators(
    startsWithA,
    endsWithC
  )({ field: 'My Field', multiple: true });

  const result = validator('BBB');

  expect(result).toEqual([
    'My Field must start with A',
    'My Field must end with C',
  ]);
});

it('returns multiple errors as an object', () => {
  const validator = composeValidators({
    A: startsWithA,
    C: endsWithC,
  })({ field: 'My Field', multiple: true });

  const result = validator('BBB');

  expect(result).toEqual({
    A: 'My Field must start with A',
    C: 'My Field must end with C',
  });
});

it('returns an empty array if valid', () => {
  const validator = composeValidators(
    startsWithA,
    endsWithC
  )({ field: 'My Field', multiple: true });

  const result = validator('ABC');

  // Separately assert it's an array because `t.deepEqual([], {})` is true
  // right now in ava.
  // Reference: https://github.com/sotojuan/not-so-shallow/issues/4
  expect(Array.isArray(result)).toBe(true);
  expect(result).toEqual([]);
});

it('returns an empty object if valid', () => {
  const validator = composeValidators({
    A: startsWithA,
    C: endsWithC,
  })({ field: 'My Field', multiple: true });

  const result = validator('ABC');

  // Separately assert it's not an array because `t.deepEqual([], {})` is true
  // right now in ava.
  // Reference: https://github.com/sotojuan/not-so-shallow/issues/4
  expect(Array.isArray(result)).toBe(false);
  expect(typeof result).toBe('object');
  expect(result).toEqual({});
});

it('allows customizing individual validators with multiple errors', () => {
  const validator = composeValidators(
    startsWithA({ message: messages.startsWithA }),
    endsWithC({ message: messages.endsWithC })
  )({ multiple: true });

  const result = validator('BBB');

  expect(result).toEqual([
    messages.startsWithA,
    messages.endsWithC,
  ]);
});
