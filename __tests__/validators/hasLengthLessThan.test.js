// @flow
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

it('unconfigured is cloneable', () => {
  const clonedUnconfigured = unconfigured.clone((field, max) => (
    `${field} error ${max}`
  ));

  const cloned = clonedUnconfigured(MAX)(FIELD);
  const expected = `${FIELD} error ${MAX}`;

  expect(cloned(repeat('a', MAX))).toBe(expected);
});

it('configured is cloneable', () => {
  const cloned = unconfigured(MAX).clone((field, max) => (
    `${field} error ${max}`
  ))(FIELD);

  const expected = `${FIELD} error ${MAX}`;

  expect(cloned(repeat('a', MAX))).toBe(expected);
});
