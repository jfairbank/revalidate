import unconfigured from '../../src/validators/isOneOf';

const validValues = ['foo', 'bar'];
const message = 'Invalid';
const isOneOf = unconfigured(validValues)({ message });

it('allows valid values', () => {
  validValues.forEach(value => {
    expect(isOneOf(value)).toEqual(undefined);
  });
});

it('does not allow other values', () => {
  expect(isOneOf('baz')).toBe(message);
});

it('forces case sensitivity by default when comparing', () => {
  validValues.forEach(value => {
    expect(isOneOf(value.toUpperCase())).toBe(message);
  });
});

it('allows a custom comparer function', () => {
  const customIsOneOf = unconfigured(
    validValues,
    (a, b) => a.toLowerCase() === b.toLowerCase()
  )({ message });

  validValues.forEach(value => {
    expect(customIsOneOf(value.toUpperCase())).toEqual(undefined);
  });
});
