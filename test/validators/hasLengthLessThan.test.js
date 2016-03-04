import test from 'ava';
import repeat from 'lodash.repeat';
import unconfigured from '../../src/validators/hasLengthLessThan';

const MAX = 3;
const message = 'Invalid';
const hasLengthLessThan = unconfigured(MAX)({ message });

test('allows lengths less than max', t => {
  t.same(
    hasLengthLessThan(repeat('a', MAX - 1)),
    undefined
  );
});

test('does not allow lengths equal to max', t => {
  t.is(
    hasLengthLessThan(repeat('a', MAX)),
    message
  );
});

test('does not allow lengths greater than max', t => {
  t.is(
    hasLengthLessThan(repeat('a', MAX + 1)),
    message
  );
});
