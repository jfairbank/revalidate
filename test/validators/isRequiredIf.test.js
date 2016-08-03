import test from 'ava';
import isRequiredIf from '../../src/validators/isRequiredIf';
import isAlphabetic from '../../src/validators/isAlphabetic';
import composeValidators from '../../src/composeValidators';

const message = 'Invalid';
const alphabeticMessage = 'Must be alphabetic';
const allValues = { bar: 42 };

const validator = isRequiredIf(values => values && values.bar)({ message });

const composedValidator = composeValidators(
  validator,
  isAlphabetic({ message: alphabeticMessage })
)();

test('requires if value is null', t => {
  t.is(validator(null, allValues), message);
});

test('requires if value is undefined', t => {
  t.is(validator(undefined, allValues), message);
});

test('requires if value is empty string', t => {
  t.is(validator('', allValues), message);
  t.is(validator(' ', allValues), message);
});

test('allows other values', t => {
  const values = [true, false, 0, 42, 'foo', {}, [], { foo: 'bar' }, [42]];

  values.forEach(value => {
    t.is(validator(value, allValues), undefined);
  });
});

test('does not require if bar is missing', t => {
  t.is(validator(null), undefined);
  t.is(validator(undefined), undefined);
  t.is(validator(''), undefined);
  t.is(validator(' '), undefined);
});

test('other validations run if it\'s required', t => {
  t.is(composedValidator('123', allValues), alphabeticMessage);
});

test('other validations still run even if it\'s not required', t => {
  t.is(composedValidator('123'), alphabeticMessage);
});
