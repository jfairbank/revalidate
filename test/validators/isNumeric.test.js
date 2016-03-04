import test from 'ava';
import unconfigured from '../../src/validators/isNumeric';

const message = 'Invalid';
const isNumeric = unconfigured({ message });

test('allows numeric digits', t => {
  const digits = '0123456789';

  t.same(
    isNumeric(digits),
    undefined
  );
});

test('does not allow letters', t => {
  const letters = Array.from(
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  );

  letters.forEach(letter => {
    t.is(
      isNumeric(letter),
      message,
      'by itself'
    );

    t.is(
      isNumeric(letter + '1'),
      message,
      'with digit included'
    );
  });
});

test('does not allow other characters', t => {
  const chars = Array.from('!@#$%^&*()-_+=~`[]{}\\|:;"\',.<>?/ ');

  chars.forEach(c => {
    t.is(
      isNumeric(c),
      message,
      'by itself'
    );

    t.is(
      isNumeric(c + '1'),
      message,
      'with digit included'
    );
  });
});
