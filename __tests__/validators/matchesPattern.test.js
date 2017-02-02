// @flow
import { matchesPattern } from '../../src';

const FIELD = 'Foo';
const REGEX = /^[A-Za-z]+$/;
const isAlphabetic = matchesPattern(REGEX)(FIELD);
const expectedErrorMessage = `${FIELD} must match pattern ${REGEX.toString()}`;

it('matches arbitrary patterns', () => {
  expect(isAlphabetic('abc')).toBe(undefined);
  expect(isAlphabetic('123')).toBe(expectedErrorMessage);
});

it('does not require value', () => {
  expect(isAlphabetic()).toBe(undefined);
  expect(isAlphabetic('')).toBe(undefined);
  expect(isAlphabetic(null)).toBe(undefined);
});

it('unconfigured is cloneable', () => {
  const clonedUnconfigured = matchesPattern.clone((field, regex) => (
    `${field} error ${regex.toString()}`
  ));

  const cloned = clonedUnconfigured(REGEX)(FIELD);
  const expected = `${FIELD} error ${REGEX.toString()}`;

  expect(cloned('123')).toBe(expected);
});

it('configured is cloneable', () => {
  const cloned = matchesPattern(REGEX).clone((field, regex) => (
    `${field} error ${regex.toString()}`
  ))(FIELD);

  const expected = `${FIELD} error ${REGEX.toString()}`;

  expect(cloned('123')).toBe(expected);
});
