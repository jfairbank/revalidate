import test from 'ava';
import repeat from 'lodash.repeat';
import unconfigured from '../../src/validators/hasLengthGreaterThan';

const MIN = 2;
const message = 'Invalid';
const hasLengthGreaterThan = unconfigured(MIN)({ message });

test('allows lengths greater than min', t => {
  t.deepEqual(
    hasLengthGreaterThan(repeat('a', MIN + 1)),
    undefined
  );
});

test('does not allow lengths equal to min', t => {
  t.is(
    hasLengthGreaterThan(repeat('a', MIN)),
    message
  );
});

test('does not allow lengths less than min', t => {
  t.is(
    hasLengthGreaterThan(repeat('a', MIN - 1)),
    message
  );
});
