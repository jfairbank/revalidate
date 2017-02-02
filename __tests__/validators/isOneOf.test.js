// @flow
import unconfigured from '../../src/validators/isOneOf';

const FIELD = 'Foo';
const validValues = ['foo', 'bar'];
const isOneOf = unconfigured(validValues)(FIELD);
const expectedErrorMessage = `${FIELD} must be one of ["foo","bar"]`;

it('allows valid values', () => {
  validValues.forEach(value => {
    expect(isOneOf(value)).toBe(undefined);
  });
});

it('ignores undefined', () => {
  expect(isOneOf()).toBe(undefined);
});

it('does not allow other values', () => {
  expect(isOneOf('baz')).toBe(expectedErrorMessage);
});

it('forces case sensitivity by default when comparing', () => {
  validValues.forEach(value => {
    expect(isOneOf(value.toUpperCase())).toBe(expectedErrorMessage);
  });
});

it('allows a custom comparer function', () => {
  const customIsOneOf = unconfigured(
    validValues,
    (a, b) => a.toLowerCase() === b.toLowerCase(),
  )(FIELD);

  validValues.forEach(value => {
    expect(customIsOneOf(value.toUpperCase())).toBe(undefined);
  });
});

it('unconfigured is cloneable', () => {
  const clonedUnconfigured = unconfigured.clone((field, values) => (
    `${field} error ${JSON.stringify(values)}`
  ));

  const cloned = clonedUnconfigured(validValues)(FIELD);
  const expected = `${FIELD} error ${JSON.stringify(validValues)}`;

  expect(cloned('baz')).toBe(expected);
});

it('configured is cloneable', () => {
  const cloned = unconfigured(validValues).clone((field, values) => (
    `${field} error ${JSON.stringify(values)}`
  ))(FIELD);

  const expected = `${FIELD} error ${JSON.stringify(validValues)}`;

  expect(cloned('baz')).toBe(expected);
});
