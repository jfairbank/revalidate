import unconfigured from '../../../src/validators/matchesField';

const otherField = 'password';
const message = 'Passwords do not match';
const matchesField = unconfigured(otherField)({ message });

it('allows matching values', () => {
  expect(matchesField('secret', { [otherField]: 'secret' })).toEqual(undefined);
});

it('fails if allValues are not provided', () => {
  expect(matchesField('secret')).toEqual(message);
});

it('does not allow non-matching values', () => {
  expect(matchesField('not secret', { [otherField]: 'secret' })).toBe(message);
});

it('forces case sensitivity by default when comparing', () => {
  expect(matchesField('SECRET', { [otherField]: 'secret' })).toBe(message);
});
