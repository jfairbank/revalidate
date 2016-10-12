import { matchesPattern } from '../../src';

const message = 'Error';
const isAlphabetic = matchesPattern(/^[A-Za-z]+$/)({ message });

it('matches arbitrary patterns', () => {
  expect(isAlphabetic('abc')).toBe(undefined);
  expect(isAlphabetic('123')).toBe(message);
});

it('does not require value', () => {
  expect(isAlphabetic()).toBe(undefined);
  expect(isAlphabetic('')).toBe(undefined);
  expect(isAlphabetic(null)).toBe(undefined);
});
