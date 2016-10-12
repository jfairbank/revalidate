import unconfigured from '../../../src/validators/matchesField';

const FIELD = 'Hello';
const OTHER_FIELD = 'World';
const expectedErrorMessage = `${FIELD} must match ${OTHER_FIELD}`;

it('matches deep field', () => {
  const matchesField = unconfigured('contact.password', OTHER_FIELD)(FIELD);
  const values = { contact: { password: 'secret' } };

  expect(matchesField('secret', values)).toBe(undefined);
});

it('fails if does not match deep field', () => {
  const matchesField = unconfigured('contact.password', OTHER_FIELD)(FIELD);
  const values = { contact: { password: 'secret' } };

  expect(matchesField('foo', values)).toBe(expectedErrorMessage);
});

it('matches deep array value', () => {
  const matchesField = unconfigured('my.passwords[1]', OTHER_FIELD)(FIELD);
  const values = { my: { passwords: ['foo', 'secret'] } };

  expect(matchesField('secret', values)).toBe(undefined);
});

it('fails if does not match deep array value', () => {
  const matchesField = unconfigured('my.passwords[1]', OTHER_FIELD)(FIELD);
  const values = { my: { passwords: ['foo', 'secret'] } };

  expect(matchesField('bar', values)).toBe(expectedErrorMessage);
});

it('matches deep array field', () => {
  const matchesField = unconfigured('contacts[1].password', OTHER_FIELD)(FIELD);

  const values = {
    contacts: [
      { password: 'foo' },
      { password: 'secret' },
    ],
  };

  expect(matchesField('secret', values)).toBe(undefined);
});

it('fails if does not match deep array field', () => {
  const matchesField = unconfigured('contacts[1].password', OTHER_FIELD)(FIELD);

  const values = {
    contacts: [
      { password: 'foo' },
      { password: 'secret' },
    ],
  };

  expect(matchesField('bar', values)).toBe(expectedErrorMessage);
});
