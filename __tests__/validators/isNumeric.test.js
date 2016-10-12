import unconfigured from '../../src/validators/isNumeric';

const message = 'Invalid';
const isNumeric = unconfigured({ message });

it('allows numeric digits', () => {
  const digits = '0123456789';

  expect(isNumeric(digits)).toEqual(undefined);
});

it('does not allow letters', () => {
  const letters = Array.from(
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  );

  letters.forEach(letter => {
    expect(isNumeric(letter)).toBe(message);

    expect(isNumeric(`${letter}1`)).toBe(message);
  });
});

it('does not allow other characters', () => {
  const chars = Array.from('!@#$%^&*()-_+=~`[]{}\\|:;"\',.<>?/ ');

  chars.forEach(c => {
    expect(isNumeric(c)).toBe(message);

    expect(isNumeric(`${c}1`)).toBe(message);
  });
});
