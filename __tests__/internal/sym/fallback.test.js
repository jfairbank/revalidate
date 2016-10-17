// @flow
/* eslint-disable global-require */
it('uses a namespaced string if Symbol is not available', () => {
  const descriptor = Object.getOwnPropertyDescriptor(global, 'Symbol');
  global.Symbol = null;

  const sym = require('../../../src/internal/sym').default;

  const result = sym('foo');

  expect(typeof result).toBe('string');
  expect(result).toBe('@@revalidate/foo');

  Object.defineProperty(global, 'Symbol', descriptor);
});
