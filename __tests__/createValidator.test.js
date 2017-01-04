// @flow
import createValidator from '../src/createValidator';

const validatorDefinition = message => value => {
  if (typeof value !== 'number') {
    return message;
  }
};

const isNumber = createValidator(
  validatorDefinition,
  field => `${field} must be a number`,
);

it('creating requires a string or function message creator', () => {
  const errorMessage = 'Please provide a message string or message creator function';

  expect(_ => createValidator(validatorDefinition)).toThrowError(errorMessage);
  expect(_ => createValidator(validatorDefinition, 'foo')).not.toThrow();
});

it('requires a string or configuration object', () => {
  const errorMessage = (
    'Please provide a string or configuration object with a `field` or ' +
    '`message` property'
  );

  expect(_ => isNumber()).toThrowError(errorMessage);
  expect(_ => isNumber({})).toThrowError(errorMessage);
  expect(_ => isNumber('My Field')).not.toThrow();
  expect(_ => isNumber({ field: 'My Field' })).not.toThrow();
});

it('allows field to be an object', () => {
  const customIsNumber = createValidator(
    validatorDefinition,
    msg => `${msg.id} => ${msg.defaultMessage}`
  );
  const field = { id: 'validation.isNumber', defaultMessage: ''};
  expect(_ => customIsNumber({ field })).not.toThrow();
})

it('it can use a plain string message', () => {
  const message = 'Must be number';
  const validator = createValidator(validatorDefinition, message);

  expect(validator()('foo')).toBe(message);
});

it('returns a curried function', () => {
  expect(typeof isNumber).toBe('function');
  expect(typeof isNumber('My Field')).toBe('function');
});

it('returns the message with the field for an invalid value', () => {
  const message = 'My Field must be a number';

  expect(isNumber('My Field')('foo')).toBe(message);
  expect(isNumber('My Field', 'foo')).toBe(message);
});

it('returns the message with the field as config option for an invalid value', () => {
  const message = 'My Other Field must be a number';

  expect(isNumber({ field: 'My Other Field' })('foo')).toBe(message);
  expect(isNumber({ field: 'My Other Field' }, 'foo')).toBe(message);
});

it('returns undefined for a valid value', () => {
  expect(isNumber('My Field')(42)).toEqual(undefined);
  expect(isNumber('My Field', 42)).toEqual(undefined);
});

it('uses the overriding message for an invalid value', () => {
  const message = 'Invalid Value';

  expect(isNumber({ message })('foo')).toBe(message);
  expect(isNumber({ message }, 'foo')).toBe(message);
});

it('uses the defaultMessageCreator if it is a string and config only has field', () => {
  const defaultMessageCreator = 'hello';

  const validator = createValidator(
    message => value => !value && message,
    defaultMessageCreator,
  )({ field: 'Foo' });

  expect(validator()).toBe(defaultMessageCreator);
});

const matchingValidatorDefinition = message => (value, allValues) => {
  if (!allValues || value !== allValues.matchedValue) {
    return message;
  }
};

const doesMatch = createValidator(
  matchingValidatorDefinition,
  field => `${field} must match the 'matchedValue'`,
);

it('can create multi-value validators', () => {
  expect(
    doesMatch('My Field')(
      'My Value',
      { matchedValue: 'My Value' },
    ),
  ).toBe(undefined);

  expect(
    doesMatch('My Field')('My Value'),
  ).toBe(
    'My Field must match the \'matchedValue\'',
  );

  expect(
    doesMatch('My Field')(
      'My Value',
      { matchedValue: 'Not My Value' },
    ),
  ).toBe(
    'My Field must match the \'matchedValue\'',
  );
});
