import test from 'ava';
import { fillObjectFromPath } from '../../src/internal';

test('fills a deep object', t => {
  t.deepEqual(
    fillObjectFromPath({}, ['foo', 'bar', 'baz'], 42),
    { foo: { bar: { baz: 42 } } }
  );
});

test('adds other values', t => {
  t.deepEqual(
    fillObjectFromPath(
      { foo: { bar: { baz: 42 } } },
      ['foo', 'bar', 'quux'],
      20
    ),

    { foo: { bar: { baz: 42, quux: 20 } } },
  );
});

test('fills a shallow object', t => {
  t.deepEqual(
    fillObjectFromPath({}, ['foo'], 42),
    { foo: 42 }
  );
});
