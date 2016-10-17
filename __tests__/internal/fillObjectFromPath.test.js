// @flow
import { fillObjectFromPath } from '../../src/internal';

it('fills a deep object', () => {
  expect(
    fillObjectFromPath({}, ['foo', 'bar', 'baz'], 42)
  ).toEqual({
    foo: {
      bar: {
        baz: 42,
      },
    },
  });
});

it('adds other values', () => {
  expect(
    fillObjectFromPath(
      { foo: { bar: { baz: 42 } } },
      ['foo', 'bar', 'quux'],
      20
    )
  ).toEqual({
    foo: {
      bar: {
        baz: 42,
        quux: 20,
      },
    },
  });
});

it('fills a shallow object', () => {
  expect(
    fillObjectFromPath({}, ['foo'], 42)
  ).toEqual(
    { foo: 42 }
  );
});
