import test from 'ava';
import range from 'lodash/range';
import repeat from 'lodash/repeat';
import unconfigured from '../../src/validators/hasLengthBetween';

const MIN = 2;
const MAX = 4;
const message = 'Invalid';
const hasLengthBetween = unconfigured(MIN, MAX)({ message });

test('allows lengths between min and max inclusively', t => {
  range(MIN, MAX + 1).forEach(n => {
    t.deepEqual(
      hasLengthBetween(repeat('a', n)),
      undefined
    );
  });
});

test('does not allow lengths less than min', t => {
  t.is(
    hasLengthBetween(repeat('a', MIN - 1)),
    message
  );
});

test('does not allow lengths greater than max', t => {
  t.is(
    hasLengthBetween(repeat('a', MAX + 1)),
    message
  );
});
