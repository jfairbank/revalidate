import test from 'ava';
import unconfigured from '../../../src/validators/matchesField';

const otherField = 'password';
const message = 'Passwords do not match';
const matchesField = unconfigured(otherField)({ message });

test('allows matching values', t => {
  t.deepEqual(
    matchesField('secret', { [otherField]: 'secret' }),
    undefined
  );
});

test('fails if allValues are not provided', t => {
  t.deepEqual(
    matchesField('secret'),
    message
  );
});

test('does not allow non-matching values', t => {
  t.is(
    matchesField('not secret', { [otherField]: 'secret' }),
    message
  );
});

test('forces case sensitivity by default when comparing', t => {
  t.is(
    matchesField('SECRET', { [otherField]: 'secret' }),
    message
  );
});
