import test from 'ava';
import unconfigured from '../../src/validators/isRequired';

const message = 'Invalid';
const isRequired = unconfigured({ message });

test('does not allow null', t => {
  t.is(isRequired(null), message);
});

test('does not allow undefined', t => {
  t.is(isRequired(undefined), message);
});

test('does not allow an empty string', t => {
  t.is(isRequired(''), message);
  t.is(isRequired(' '), message);
});

test('allows other values', t => {
  const values = [true, false, 0, 42, 'foo', {}, [], { foo: 'bar' }, [42]];

  values.forEach(value => {
    t.deepEqual(isRequired(value), undefined);
  });
});
