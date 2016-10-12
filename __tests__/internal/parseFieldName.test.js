import { parseFieldName } from '../../src/internal';

it('parses a field name', () => {
  expect(parseFieldName('foo')).toEqual({
    isArray: false,
    baseName: 'foo',
    fullName: 'foo',
  });
});

it('detects an array field', () => {
  expect(parseFieldName('foo[]')).toEqual({
    isArray: true,
    baseName: 'foo',
    fullName: 'foo[]',
  });
});
