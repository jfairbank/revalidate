// @flow
import repeat from 'lodash/repeat';
import unconfigured from '../../src/validators/hasLengthLessThan';

const FIELD = 'Foo';
const LESS_THAN_LIMIT = 4;
const MAX = LESS_THAN_LIMIT - 1;
const hasLengthLessThan = unconfigured(LESS_THAN_LIMIT)(FIELD);
const expectedErrorMessage = `${FIELD} cannot be longer than ${MAX} characters`;

it('allows lengths less than given value', () => {
  expect(hasLengthLessThan(repeat('a', MAX))).toBe(undefined);
});

it('does not allow lengths equal to the given value', () => {
  expect(hasLengthLessThan(repeat('a', LESS_THAN_LIMIT))).toBe(expectedErrorMessage);
});

it('does not allow lengths greater than the given value', () => {
  expect(hasLengthLessThan(repeat('a', LESS_THAN_LIMIT + 1))).toBe(expectedErrorMessage);
});

it('unconfigured is cloneable', () => {
  const clonedUnconfigured = unconfigured.clone((field, max) => (
    `${field} error ${max}`
  ));

  const cloned = clonedUnconfigured(LESS_THAN_LIMIT)(FIELD);
  const expected = `${FIELD} error ${LESS_THAN_LIMIT}`;

  expect(cloned(repeat('a', LESS_THAN_LIMIT))).toBe(expected);
});

it('configured is cloneable', () => {
  const cloned = unconfigured(LESS_THAN_LIMIT).clone((field, limit) => (
    `${field} error ${limit}`
  ))(FIELD);

  const expected = `${FIELD} error ${LESS_THAN_LIMIT}`;

  expect(cloned(repeat('a', LESS_THAN_LIMIT))).toBe(expected);
});
