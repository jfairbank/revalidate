import createValidator from '../src/createValidator';

const validatorDefinition = message => value => {
  if (typeof value !== 'number') {
    return message;
  }
};

const isNumber = createValidator(
  validatorDefinition,
  field => `${field} must be a number`
);

it('requires a string or configuration object', () => {
  expect(_ => isNumber()).toThrow();
  expect(_ => isNumber('My Field')).not.toThrow();
  expect(_ => isNumber({ field: 'My Field' })).not.toThrow();
});

it('requires the configuration object include field or message', () => {
  expect(_ => isNumber({})).toThrow();
  expect(_ => isNumber({ field: 'My Field' })).not.toThrow();
  expect(_ => isNumber({ message: 'My Message' })).not.toThrow();
});

it('creating requires a message creator', () => {
  expect(_ => createValidator(validatorDefinition)).toThrow();
});

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


const matchingValidatorDefinition = message => (value, allValues) => {
  if (!allValues || value !== allValues.matchedValue) {
    return message;
  }
};

const doesMatch = createValidator(
  matchingValidatorDefinition,
  field => `${field} must match the 'matchedValue'`
);

it('can create multi-value validators', () => {
  expect(doesMatch('My Field')('My Value', { matchedValue: 'My Value' })).toEqual(undefined);

  expect(doesMatch('My Field')('My Value')).toEqual('My Field must match the \'matchedValue\'');

  expect(doesMatch('My Field')('My Value', { matchedValue: 'Not My Value' })).toEqual('My Field must match the \'matchedValue\'');
});
