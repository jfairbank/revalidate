import test from 'ava';
import unconfigured from '../../src/validators/matchesValue';

const matchKey = 'password';
const message = `Passwords don't match`;
const matchesValue = unconfigured(matchKey)({ message });

test('allows matching values', t => {
  t.same(
    matchesValue('secret', {'password': 'secret'}),
    undefined
  );
});

test('does not allow non-matching values', t => {
  t.is(
    matchesValue('not secret', {'password': 'secret'}),
    message
  );
});

test('forces case sensitivity by default when comparing', t => {
  t.is(
    matchesValue('NOT SECRET', {'password': 'secret'}),
    message
  );
});
