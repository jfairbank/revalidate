import test from 'ava';
import createValidator from '../src/createValidator';
import composeValidators from '../src/composeValidators';

const startsWithA = createValidator(
  message => value => {
    if (value && !/^A/.test(value)) {
      return message;
    }
  },

  field => `${field} must start with A`
);

const endsWithC = createValidator(
  message => value => {
    if (value && !/C$/.test(value)) {
      return message;
    }
  },

  field => `${field} must end with C`
);

const validator = composeValidators(
  startsWithA,
  endsWithC
)('My Field');

test('stops on the first failure', t => {
  t.is(
    validator('BBB'),
    'My Field must start with A'
  );
});

test('stops on the next failure', t => {
  t.is(
    validator('ABB'),
    'My Field must end with C'
  );
});

test('validates a value that satisifes all validators', t => {
  t.deepEqual(
    validator('ABC'),
    undefined
  );
});

test('allows overriding messages per validator', t => {
  const messageForA = 'Missing A at start';
  const messageForC = 'Missing C at end';

  const validator = composeValidators(
    startsWithA({ message: messageForA }),
    endsWithC({ message: messageForC })
  )('My Field');

  t.is(
    validator('BBB'),
    messageForA
  );

  t.is(
    validator('ABB'),
    messageForC
  );
});

// Silly, but it supports it
test('allows overriding field per validator', t => {
  const validator = composeValidators(
    startsWithA('My A Field'),
    endsWithC('My C Field')
  )('My Field');

  t.is(
    validator('BBB'),
    'My A Field must start with A'
  );

  t.is(
    validator('ABB'),
    'My C Field must end with C'
  );
});

test('allows returning multiple errors', t => {
  const validator = composeValidators(
    startsWithA,
    endsWithC
  )({ field: 'My Field', multiple: true });

  t.deepEqual(
    validator('BBB'),

    [
      'My Field must start with A',
      'My Field must end with C'
    ]
  );
});

test('returns an empty array if valid with multiple set to true', t => {
  const validator = composeValidators(
    startsWithA,
    endsWithC
  )({ field: 'My Field', multiple: true });

  t.deepEqual(validator('ABC'), []);
});
