// @flow
import unconfigured from '../../src/validators/isAlphaNumeric';

const FIELD = 'Foo';
const isAlphaNumeric = unconfigured(FIELD);
const expectedErrorMessage = `${FIELD} must be alphanumeric`;

it('allows alphanumeric characters', () => {
  const validCharacters =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  expect(isAlphaNumeric(validCharacters)).toEqual(undefined);
});

it('does not allow other common characters', () => {
  const chars = '!@#$%^&*()-_+=~`[]{}\\|:;"\',.<>?/ '.split('');

  chars.forEach(c => {
    expect(isAlphaNumeric(c)).toBe(expectedErrorMessage);
    expect(isAlphaNumeric(`${c}a`)).toBe(expectedErrorMessage);
    expect(isAlphaNumeric(`${c}1`)).toBe(expectedErrorMessage);
  });
});

it('is cloneable', () => {
  const cloned = unconfigured.clone(field => `${field} error`)(FIELD);
  const expected = `${FIELD} error`;

  expect(cloned('!')).toBe(expected);
});
