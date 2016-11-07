// @flow
import isRequiredIf from '../../src/validators/isRequiredIf';
import isAlphabetic from '../../src/validators/isAlphabetic';
import composeValidators from '../../src/composeValidators';

const FIELD = 'Foo';
const alphabeticMessage = 'Must be alphabetic';
const allValues = { bar: 42 };
const expectedErrorMessage = `${FIELD} is required`;

const validator = isRequiredIf(values => !!values && !!values.bar)(FIELD);

const composedValidator = composeValidators(
  validator,
  isAlphabetic({ message: alphabeticMessage }),
)();

it('requires if value is null', () => {
  expect(validator(null, allValues)).toBe(expectedErrorMessage);
});

it('requires if value is undefined', () => {
  expect(validator(undefined, allValues)).toBe(expectedErrorMessage);
});

it('requires if value is empty string', () => {
  expect(validator('', allValues)).toBe(expectedErrorMessage);
  expect(validator(' ', allValues)).toBe(expectedErrorMessage);
});

it('allows other values', () => {
  const values = [true, false, 0, 42, 'foo', {}, [], { foo: 'bar' }, [42]];

  values.forEach(value => {
    expect(validator(value, allValues)).toBe(undefined);
  });
});

it('does not require if bar is missing', () => {
  expect(validator(null)).toBe(undefined);
  expect(validator(undefined)).toBe(undefined);
  expect(validator('')).toBe(undefined);
  expect(validator(' ')).toBe(undefined);
});

it('other validations run if it\'s required', () => {
  expect(composedValidator('123', allValues)).toBe(alphabeticMessage);
});

it('other validations still run even if it\'s not required', () => {
  expect(composedValidator('123')).toBe(alphabeticMessage);
});
