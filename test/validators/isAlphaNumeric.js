import test from 'ava';
import unconfigured from '../../src/validators/isAlphaNumeric';

const message = 'Invalid';
const isAlphaNumeric = unconfigured({ message });

test('allows alphanumeric characters', t => {
  const validCharacters =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  t.same(
    isAlphaNumeric(validCharacters),
    undefined
  );
});

test('does not allow other common characters', t => {
  const chars = Array.from('!@#$%^&*()-_+=~`[]{}\\|:;"\',.<>?/ ');

  chars.forEach(c => {
    t.is(
      isAlphaNumeric(c),
      message,
      'by itself'
    );

    t.is(
      isAlphaNumeric(c + 'a'),
      message,
      'with letter'
    );

    t.is(
      isAlphaNumeric(c + '1'),
      message,
      'with digit'
    );
  });
});
