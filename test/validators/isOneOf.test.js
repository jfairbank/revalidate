import test from 'ava';
import unconfigured from '../../src/validators/isOneOf';

const validValues = ['foo', 'bar'];
const message = 'Invalid';
const isOneOf = unconfigured(validValues)({ message });

test('allows valid values', t => {
  validValues.forEach(value => {
    t.same(
      isOneOf(value),
      undefined
    );
  });
});

test('does not allow other values', t => {
  t.is(
    isOneOf('baz'),
    message
  );
});

test('forces case sensitivity by default when comparing', t => {
  validValues.forEach(value => {
    t.is(
      isOneOf(value.toUpperCase()),
      message
    );
  });
});

test('allows a custom comparer function', t => {
  const customIsOneOf = unconfigured(
    validValues,
    (a, b) => a.toLowerCase() === b.toLowerCase()
  )({ message });

  validValues.forEach(value => {
    t.same(
      customIsOneOf(value.toUpperCase()),
      undefined
    );
  });
});
