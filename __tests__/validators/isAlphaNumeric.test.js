import unconfigured from '../../src/validators/isAlphaNumeric';

const message = 'Invalid';
const isAlphaNumeric = unconfigured({ message });

it('allows alphanumeric characters', () => {
  const validCharacters =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  expect(isAlphaNumeric(validCharacters)).toEqual(undefined);
});

it('does not allow other common characters', () => {
  const chars = Array.from('!@#$%^&*()-_+=~`[]{}\\|:;"\',.<>?/ ');

  chars.forEach(c => {
    expect(isAlphaNumeric(c)).toBe(message);

    expect(isAlphaNumeric(`${c}a`)).toBe(message);

    expect(isAlphaNumeric(`${c}1`)).toBe(message);
  });
});
