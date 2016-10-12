import repeat from 'lodash/repeat';
import unconfigured from '../../src/validators/hasLengthLessThan';

const FIELD = 'Foo';
const MAX = 3;
const hasLengthLessThan = unconfigured(MAX)(FIELD);
const expectedErrorMessage = `${FIELD} cannot be longer than ${MAX} characters`;

it('allows lengths less than max', () => {
  expect(hasLengthLessThan(repeat('a', MAX - 1))).toBe(undefined);
});

it('does not allow lengths equal to max', () => {
  expect(hasLengthLessThan(repeat('a', MAX))).toBe(expectedErrorMessage);
});

it('does not allow lengths greater than max', () => {
  expect(hasLengthLessThan(repeat('a', MAX + 1))).toBe(expectedErrorMessage);
});
