import test from 'ava';
import { matchesPattern } from '../../src';

const message = 'Error';
const isAlphabetic = matchesPattern(/^[A-Za-z]+$/)({ message });

test('matches arbitrary patterns', t => {
  t.is(isAlphabetic('abc'), undefined);
  t.is(isAlphabetic('123'), message);
});

test('does not require value', t => {
  t.is(isAlphabetic(), undefined);
  t.is(isAlphabetic(''), undefined);
  t.is(isAlphabetic(null), undefined);
});
