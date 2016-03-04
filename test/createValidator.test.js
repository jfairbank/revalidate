import test from 'ava';
import createValidator from '../src/createValidator';
import composeValidators from '../src/composeValidators';

const validatorDefinition = message => value => {
  if (typeof value !== 'number') {
    return message;
  }
};

const isNumber = createValidator(
  validatorDefinition,
  field => `${field} must be a number`
);

test('requires a string or configuration object', t => {
  t.throws(_ => isNumber());
  t.notThrows(_ => isNumber('My Field'));
  t.notThrows(_ => isNumber({ field: 'My Field' }));
});

test('requires the configuration object include field or message', t => {
  t.throws(_ => isNumber({}));
  t.notThrows(_ => isNumber({ field: 'My Field' }));
  t.notThrows(_ => isNumber({ message: 'My Message' }));
});

test('creating requires a message creator', t => {
  t.throws(_ => createValidator(validatorDefinition));
});

test('it can use a plain string message', t => {
  const message = 'Must be number';
  const validator = createValidator(validatorDefinition, message);

  t.is(
    validator()('foo'),
    message
  );
});

test('returns a curried function', t => {
  t.is(typeof isNumber, 'function');
  t.is(typeof isNumber('My Field'), 'function');
});

test('returns the message with the field for an invalid value', t => {
  const message = 'My Field must be a number';

  t.is(
    isNumber('My Field')('foo'),
    message
  );

  t.is(
    isNumber('My Field', 'foo'),
    message
  );
});

test('returns the message with the field as config option for an invalid value', t => {
  const message = 'My Other Field must be a number';

  t.is(
    isNumber({ field: 'My Other Field' })('foo'),
    message
  );

  t.is(
    isNumber({ field: 'My Other Field' }, 'foo'),
    message
  );
});

test('returns undefined for a valid value', t => {
  t.same(
    isNumber('My Field')(42),
    undefined
  );

  t.same(
    isNumber('My Field', 42),
    undefined
  );
});

test('uses the overriding message for an invalid value', t => {
  const message = 'Invalid Value';

  t.is(
    isNumber({ message })('foo'),
    message
  );

  t.is(
    isNumber({ message }, 'foo'),
    message
  );
});
