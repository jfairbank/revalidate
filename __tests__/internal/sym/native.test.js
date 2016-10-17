// @flow
/* eslint-disable global-require */
it('uses a Symbol if it is available', () => {
  const sym = require('../../../src/internal/sym').default;

  const result = sym('foo');

  expect(typeof result).toBe('symbol');
  expect(result.toString()).toBe('Symbol(foo)');
});
