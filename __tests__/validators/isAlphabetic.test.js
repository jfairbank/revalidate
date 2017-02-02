// @flow
import unconfigured from '../../src/validators/isAlphabetic';

const FIELD = 'FOO';
const isAlphabetic = unconfigured(FIELD);
const expectedErrorMessage = `${FIELD} must be alphabetic`;

it('allows alphabetic characters', () => {
  const validCharacters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  expect(isAlphabetic(validCharacters)).toBe(undefined);
});

it('does not allow digits', () => {
  const digits = '0123456789'.split('');

  digits.forEach(digit => {
    expect(isAlphabetic(digit)).toBe(expectedErrorMessage);
    expect(isAlphabetic(`${digit}a`)).toBe(expectedErrorMessage);
  });
});

it('does not allow other common characters', () => {
  const chars = '!@#$%^&*()-_+=~`[]{}\\|:;"\',.<>?/ '.split('');

  chars.forEach(c => {
    expect(isAlphabetic(c)).toBe(expectedErrorMessage);
    expect(isAlphabetic(`${c}a`)).toBe(expectedErrorMessage);
  });
});

it('is cloneable', () => {
  const cloned = unconfigured.clone(field => `${field} error`)(FIELD);
  const expected = `${FIELD} error`;

  expect(cloned('1')).toBe(expected);
});
