import test from 'ava';
import unconfigured from '../../../src/validators/matchesField';

const message = 'Passwords do not match';

test('matches deep field', t => {
  const matchesField = unconfigured('contact.password')({ message });
  const values = { contact: { password: 'secret' } };

  t.deepEqual(
    matchesField('secret', values),
    undefined
  );
});

test('fails if does not match deep field', t => {
  const matchesField = unconfigured('contact.password')({ message });
  const values = { contact: { password: 'secret' } };

  t.deepEqual(
    matchesField('foo', values),
    message
  );
});

test('matches deep array value', t => {
  const matchesField = unconfigured('my.passwords[1]')({ message });
  const values = { my: { passwords: ['foo', 'secret'] } };

  t.deepEqual(
    matchesField('secret', values),
    undefined
  );
});

test('fails if does not match deep array value', t => {
  const matchesField = unconfigured('my.passwords[1]')({ message });
  const values = { my: { passwords: ['foo', 'secret'] } };

  t.deepEqual(
    matchesField('bar', values),
    message
  );
});

test('matches deep array field', t => {
  const matchesField = unconfigured('contacts[1].password')({ message });

  const values = {
    contacts: [
      { password: 'foo' },
      { password: 'secret' },
    ],
  };

  t.deepEqual(
    matchesField('secret', values),
    undefined
  );
});

test('fails if does not match deep array field', t => {
  const matchesField = unconfigured('contacts[1].password')({ message });

  const values = {
    contacts: [
      { password: 'foo' },
      { password: 'secret' },
    ],
  };

  t.deepEqual(
    matchesField('bar', values),
    message
  );
});
