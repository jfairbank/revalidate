import unconfigured from '../../../src/validators/matchesField';

const message = 'Passwords do not match';

it('matches deep field', () => {
  const matchesField = unconfigured('contact.password')({ message });
  const values = { contact: { password: 'secret' } };

  expect(matchesField('secret', values)).toBe(undefined);
});

it('fails if does not match deep field', () => {
  const matchesField = unconfigured('contact.password')({ message });
  const values = { contact: { password: 'secret' } };

  expect(matchesField('foo', values)).toBe(message);
});

it('matches deep array value', () => {
  const matchesField = unconfigured('my.passwords[1]')({ message });
  const values = { my: { passwords: ['foo', 'secret'] } };

  expect(matchesField('secret', values)).toBe(undefined);
});

it('fails if does not match deep array value', () => {
  const matchesField = unconfigured('my.passwords[1]')({ message });
  const values = { my: { passwords: ['foo', 'secret'] } };

  expect(matchesField('bar', values)).toBe(message);
});

it('matches deep array field', () => {
  const matchesField = unconfigured('contacts[1].password')({ message });

  const values = {
    contacts: [
      { password: 'foo' },
      { password: 'secret' },
    ],
  };

  expect(matchesField('secret', values)).toBe(undefined);
});

it('fails if does not match deep array field', () => {
  const matchesField = unconfigured('contacts[1].password')({ message });

  const values = {
    contacts: [
      { password: 'foo' },
      { password: 'secret' },
    ],
  };

  expect(matchesField('bar', values)).toBe(message);
});
