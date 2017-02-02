// @flow
import unconfigured from '../../src/validators/isRequired';

const FIELD = 'Foo';
const isRequired = unconfigured(FIELD);
const expectedErrorMessage = `${FIELD} is required`;

it('does not allow null', () => {
  expect(isRequired(null)).toBe(expectedErrorMessage);
});

it('does not allow undefined', () => {
  expect(isRequired(undefined)).toBe(expectedErrorMessage);
});

it('does not allow an empty string', () => {
  expect(isRequired('')).toBe(expectedErrorMessage);
  expect(isRequired(' ')).toBe(expectedErrorMessage);
});

it('allows other values', () => {
  const values = [true, false, 0, 42, 'foo', {}, [], { foo: 'bar' }, [42]];

  values.forEach(value => {
    expect(isRequired(value)).toBe(undefined);
  });
});

it('is cloneable', () => {
  const cloned = unconfigured.clone(field => `${field} error`)(FIELD);
  const expected = `${FIELD} error`;

  expect(cloned(null)).toBe(expected);
});
