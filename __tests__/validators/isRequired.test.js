import unconfigured from '../../src/validators/isRequired';

const message = 'Invalid';
const isRequired = unconfigured({ message });

it('does not allow null', () => {
  expect(isRequired(null)).toBe(message);
});

it('does not allow undefined', () => {
  expect(isRequired(undefined)).toBe(message);
});

it('does not allow an empty string', () => {
  expect(isRequired('')).toBe(message);
  expect(isRequired(' ')).toBe(message);
});

it('allows other values', () => {
  const values = [true, false, 0, 42, 'foo', {}, [], { foo: 'bar' }, [42]];

  values.forEach(value => {
    expect(isRequired(value)).toEqual(undefined);
  });
});
