// @flow
import createValidatorFactory from '../src/createValidatorFactory';

const beginsWithDefinition = (message, c: string) => (value) => {
  const regex = new RegExp(`^${c}`, 'i');

  if (value && !regex.test(value)) {
    return message;
  }
};

const beginsWith = createValidatorFactory(
  beginsWithDefinition,
  (field, c: string) => `${field} must start with ${c}`,
);

const isBetweenDefinition = (message, x: number, y: number) => (value) => {
  const n = Number(value);

  if (n < x || n > y) {
    return message;
  }
};

const isBetween = createValidatorFactory(
  isBetweenDefinition,
  (field, x: number, y: number) => `${field} must be between ${x} and ${y}`,
);

const beginsWithA = beginsWith('A');
const isBetween1And10 = isBetween(1, 10);

it('returns error message for incorrect values', () => {
  expect(beginsWithA('Foo')('bar')).toBe('Foo must start with A');
  expect(isBetween1And10('Foo')('11')).toBe('Foo must be between 1 and 10');
});

it('returns undefined for correct values', () => {
  expect(beginsWithA('Foo')('abc')).toBe(undefined);
  expect(isBetween1And10('Foo')('5')).toBe(undefined);
});

it('factories are curried', () => {
  const initial: ValidatorFactory = isBetween(1);
  const isBetween1And5 = initial(5);

  expect(isBetween1And5('Foo')('2')).toBe(undefined);
  expect(isBetween1And5('Foo')('6')).toBe('Foo must be between 1 and 5');
});

it('validators can use a plain string message', () => {
  const message = 'Must be valid';
  const factory = createValidatorFactory(beginsWithDefinition, message);
  const validator = factory('A')();

  expect(validator('foo')).toBe(message);
});

it('can specify numArgs for optional args', () => {
  const DEFAULT_Y = 1000;

  const factory = createValidatorFactory({
    numArgs: 1,

    definition: (message, x: number, y: number = DEFAULT_Y) => (value) => {
      const n = Number(value);

      if (n < x || n > y) {
        return message;
      }
    },

    messageCreator: (field, x: number, y: number = DEFAULT_Y) => `${field} must be between ${x} and ${y}`,
  });

  const isBetween1And1000 = factory(1)('Foo');
  const isBetween1And5 = factory(1, 5)('Foo');

  expect(isBetween1And1000('500')).toBe(undefined);
  expect(isBetween1And5('2')).toBe(undefined);

  expect(isBetween1And1000('1001')).toBe('Foo must be between 1 and 1000');
  expect(isBetween1And5('6')).toBe('Foo must be between 1 and 5');
});

it('creating requires a string or function message creator', () => {
  const errorMessage = 'Please provide a message string or message creator function';

  expect(_ => createValidatorFactory(beginsWithDefinition)).toThrowError(errorMessage);
  expect(_ => createValidatorFactory(beginsWithDefinition, 'foo')).not.toThrow();
});

it('requires a string or configuration object', () => {
  const errorMessage = (
    'Please provide a string or configuration object with a `field` or ' +
    '`message` property'
  );

  expect(_ => beginsWithA()).toThrowError(errorMessage);
  expect(_ => beginsWithA({})).toThrowError(errorMessage);
  expect(_ => beginsWithA('My Field')).not.toThrow();
  expect(_ => beginsWithA({ field: 'My Field' })).not.toThrow();
});

it('returns the message with the field as config option for an invalid value', () => {
  const expected = 'Foo must start with A';

  expect(beginsWithA({ field: 'Foo' })('foo')).toBe(expected);
});

it('uses the overriding message for an invalid value', () => {
  const message = 'Invalid Value';

  expect(beginsWithA({ message })('foo')).toBe(message);
});

it('uses the defaultMessageCreator if it is a string and config only has field', () => {
  const defaultMessageCreator = 'hello';

  const validator = createValidatorFactory(
    message => value => !value && message,
    defaultMessageCreator,
  )()({ field: 'Foo' });

  expect(validator()).toBe(defaultMessageCreator);
});

it('unconfigured is cloneable', () => {
  const clonedUnconfigured = beginsWith.clone((field, c) => (
    `${field} error ${c}`
  ));

  const cloned = clonedUnconfigured('A')('Foo');
  const expected = 'Foo error A';

  expect(cloned('foo')).toBe(expected);
});

it('configured is cloneable', () => {
  const cloned = beginsWith('A').clone((field, c) => (
    `${field} error ${c}`
  ))('Foo');

  const expected = 'Foo error A';

  expect(cloned('foo')).toBe(expected);
});
