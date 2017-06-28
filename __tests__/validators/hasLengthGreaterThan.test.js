// @flow
import repeat from 'lodash/repeat';
import unconfigured from '../../src/validators/hasLengthGreaterThan';

const FIELD = 'Foo';
const LIMIT = 2;
const hasLengthGreaterThan = unconfigured(LIMIT)(FIELD);
const expectedErrorMessage = `${FIELD} must be longer than ${LIMIT} characters`;

it('allows lengths greater than the given value', () => {
  expect(hasLengthGreaterThan(repeat('a', LIMIT + 1))).toBe(undefined);
});

it('does not allow lengths equal to the given value', () => {
  expect(hasLengthGreaterThan(repeat('a', LIMIT))).toBe(expectedErrorMessage);
});

it('does not allow lengths less than the given value', () => {
  expect(hasLengthGreaterThan(repeat('a', LIMIT - 1))).toBe(expectedErrorMessage);
});

it('unconfigured is cloneable', () => {
  const clonedUnconfigured = unconfigured.clone((field, limit) => (
    `${field} error ${limit}`
  ));

  const cloned = clonedUnconfigured(LIMIT)(FIELD);
  const expected = `${FIELD} error ${LIMIT}`;

  expect(cloned(repeat('a', LIMIT))).toBe(expected);
});

it('configured is cloneable', () => {
  const cloned = unconfigured(LIMIT).clone((field, limit) => (
    `${field} error ${limit}`
  ))(FIELD);

  const expected = `${FIELD} error ${LIMIT}`;

  expect(cloned(repeat('a', LIMIT))).toBe(expected);
});
