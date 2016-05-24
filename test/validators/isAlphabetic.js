import test from 'ava';
import unconfigured from '../../src/validators/isAlphabetic';

const message = 'Invalid';
const isAlphabetic = unconfigured({ message });

test('allows alphabetic characters', t => {
  const validCharacters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  t.deepEqual(
    isAlphabetic(validCharacters),
    undefined
  );
});

test('does not allow digits', t => {
  const digits = Array.from('0123456789');

  digits.forEach(digit => {
    t.is(
      isAlphabetic(digit),
      message,
      'by itself'
    );

    t.is(
      isAlphabetic(`${digit}a`),
      message,
      'with letter'
    );
  });
});

test('does not allow other common characters', t => {
  const chars = Array.from('!@#$%^&*()-_+=~`[]{}\\|:;"\',.<>?/ ');

  chars.forEach(c => {
    t.is(
      isAlphabetic(c),
      message,
      'by itself'
    );

    t.is(
      isAlphabetic(`${c}a`),
      message,
      'with letter'
    );
  });
});
