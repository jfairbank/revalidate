import unconfigured from '../../src/validators/isAlphabetic';

const message = 'Invalid';
const isAlphabetic = unconfigured({ message });

it('allows alphabetic characters', () => {
  const validCharacters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  expect(isAlphabetic(validCharacters)).toEqual(undefined);
});

it('does not allow digits', () => {
  const digits = Array.from('0123456789');

  digits.forEach(digit => {
    expect(isAlphabetic(digit)).toBe(message);

    expect(isAlphabetic(`${digit}a`)).toBe(message);
  });
});

it('does not allow other common characters', () => {
  const chars = Array.from('!@#$%^&*()-_+=~`[]{}\\|:;"\',.<>?/ ');

  chars.forEach(c => {
    expect(isAlphabetic(c)).toBe(message);

    expect(isAlphabetic(`${c}a`)).toBe(message);
  });
});
