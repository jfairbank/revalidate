import { matchesPattern } from '../../src';

const FIELD = 'Foo';
const REGEX = /^[A-Za-z]+$/;
const isAlphabetic = matchesPattern(REGEX)(FIELD);
const expectedErrorMessage = `${FIELD} must match pattern ${REGEX}`;

it('matches arbitrary patterns', () => {
  expect(isAlphabetic('abc')).toBe(undefined);
  expect(isAlphabetic('123')).toBe(expectedErrorMessage);
});

it('does not require value', () => {
  expect(isAlphabetic()).toBe(undefined);
  expect(isAlphabetic('')).toBe(undefined);
  expect(isAlphabetic(null)).toBe(undefined);
});
