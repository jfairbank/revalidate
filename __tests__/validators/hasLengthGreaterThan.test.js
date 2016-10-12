import repeat from 'lodash/repeat';
import unconfigured from '../../src/validators/hasLengthGreaterThan';

const MIN = 2;
const message = 'Invalid';
const hasLengthGreaterThan = unconfigured(MIN)({ message });

it('allows lengths greater than min', () => {
  expect(hasLengthGreaterThan(repeat('a', MIN + 1))).toEqual(undefined);
});

it('does not allow lengths equal to min', () => {
  expect(hasLengthGreaterThan(repeat('a', MIN))).toBe(message);
});

it('does not allow lengths less than min', () => {
  expect(hasLengthGreaterThan(repeat('a', MIN - 1))).toBe(message);
});
