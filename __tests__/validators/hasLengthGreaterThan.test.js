import repeat from 'lodash/repeat';
import unconfigured from '../../src/validators/hasLengthGreaterThan';

const FIELD = 'Foo';
const MIN = 2;
const hasLengthGreaterThan = unconfigured(MIN)(FIELD);
const expectedErrorMessage = `${FIELD} must be longer than ${MIN} characters`;

it('allows lengths greater than min', () => {
  expect(hasLengthGreaterThan(repeat('a', MIN + 1))).toBe(undefined);
});

it('does not allow lengths equal to min', () => {
  expect(hasLengthGreaterThan(repeat('a', MIN))).toBe(expectedErrorMessage);
});

it('does not allow lengths less than min', () => {
  expect(hasLengthGreaterThan(repeat('a', MIN - 1))).toBe(expectedErrorMessage);
});
