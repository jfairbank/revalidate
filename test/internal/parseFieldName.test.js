import test from 'ava';
import { parseFieldName } from '../../src/internal';

test('parses a field name', t => {
  t.deepEqual(
    parseFieldName('foo'),
    { isArray: false, baseName: 'foo', fullName: 'foo' }
  );
});

test('detects an array field', t => {
  t.deepEqual(
    parseFieldName('foo[]'),
    { isArray: true, baseName: 'foo', fullName: 'foo[]' }
  );
});
