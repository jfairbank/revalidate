// @flow
import unconfigured from '../../../src/validators/matchesField';

const FIELD = 'Hello';
const OTHER_FIELD_NAME = 'password';
const OTHER_FIELD_LABEL = 'World';
const matchesField = unconfigured(OTHER_FIELD_NAME, OTHER_FIELD_LABEL)(FIELD);
const expectedErrorMessage = `${FIELD} must match ${OTHER_FIELD_LABEL}`;

it('allows matching values', () => {
  expect(
    matchesField('secret', { [OTHER_FIELD_NAME]: 'secret' })
  ).toBe(
    undefined
  );
});

it('fails if allValues are not provided', () => {
  expect(matchesField('secret')).toBe(expectedErrorMessage);
});

it('does not allow non-matching values', () => {
  expect(
    matchesField('not secret', { [OTHER_FIELD_NAME]: 'secret' })
  ).toBe(
    expectedErrorMessage
  );
});

it('forces case sensitivity by default when comparing', () => {
  expect(
    matchesField('SECRET', { [OTHER_FIELD_NAME]: 'secret' })
  ).toBe(
    expectedErrorMessage
  );
});
