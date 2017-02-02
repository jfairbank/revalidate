// @flow
import range from 'lodash/range';
import repeat from 'lodash/repeat';
import unconfigured from '../../src/validators/hasLengthBetween';

const FIELD = 'FOO';
const MIN = 2;
const MAX = 4;
const hasLengthBetween = unconfigured(MIN, MAX)(FIELD);

const expectedErrorMessage = (
  `${FIELD} must be between ${MIN} and ${MAX} characters long`
);

it('allows lengths between min and max inclusively', () => {
  range(MIN, MAX + 1).forEach(n => {
    expect(hasLengthBetween(repeat('a', n))).toBe(undefined);
  });
});

it('does not allow lengths less than min', () => {
  expect(hasLengthBetween(repeat('a', MIN - 1))).toBe(expectedErrorMessage);
});

it('does not allow lengths greater than max', () => {
  expect(hasLengthBetween(repeat('a', MAX + 1))).toBe(expectedErrorMessage);
});

it('unconfigured is cloneable', () => {
  const clonedUnconfigured = unconfigured.clone((field, min, max) => (
    `${field} error ${min} ${max}`
  ));

  const cloned = clonedUnconfigured(MIN, MAX)(FIELD);
  const expected = `${FIELD} error ${MIN} ${MAX}`;

  expect(cloned(repeat('a', MIN - 1))).toBe(expected);
});

it('configured is cloneable', () => {
  const cloned = unconfigured(MIN, MAX).clone((field, min, max) => (
    `${field} error ${min} ${max}`
  ))(FIELD);

  const expected = `${FIELD} error ${MIN} ${MAX}`;

  expect(cloned(repeat('a', MIN - 1))).toBe(expected);
});
