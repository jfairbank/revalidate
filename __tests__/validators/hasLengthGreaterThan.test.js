// @flow
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

it('unconfigured is cloneable', () => {
  const clonedUnconfigured = unconfigured.clone((field, min) => (
    `${field} error ${min}`
  ));

  const cloned = clonedUnconfigured(MIN)(FIELD);
  const expected = `${FIELD} error ${MIN}`;

  expect(cloned(repeat('a', MIN))).toBe(expected);
});

it('configured is cloneable', () => {
  const cloned = unconfigured(MIN).clone((field, min) => (
    `${field} error ${min}`
  ))(FIELD);

  const expected = `${FIELD} error ${MIN}`;

  expect(cloned(repeat('a', MIN))).toBe(expected);
});
