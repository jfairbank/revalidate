import repeat from 'lodash/repeat';
import unconfigured from '../../src/validators/hasLengthLessThan';

const MAX = 3;
const message = 'Invalid';
const hasLengthLessThan = unconfigured(MAX)({ message });

it('allows lengths less than max', () => {
  expect(hasLengthLessThan(repeat('a', MAX - 1))).toEqual(undefined);
});

it('does not allow lengths equal to max', () => {
  expect(hasLengthLessThan(repeat('a', MAX))).toBe(message);
});

it('does not allow lengths greater than max', () => {
  expect(hasLengthLessThan(repeat('a', MAX + 1))).toBe(message);
});
