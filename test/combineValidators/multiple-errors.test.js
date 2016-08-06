import test from 'ava';
import { startsWithA, endsWithC } from '../helpers/validators';
import { combineValidators, composeValidators } from '../../src';

const messages = {
  foo: {
    startsWithA: 'Foo startsWithA',
    endsWithC: 'Foo endsWithC',
  },

  bar: {
    startsWithA: 'Bar startsWithA',
    endsWithC: 'Bar endsWithC',
  },
};

test('multiple array errors works for both fields', t => {
  const validator = combineValidators({
    foo: composeValidators(
      startsWithA({ message: messages.foo.startsWithA }),
      endsWithC({ message: messages.foo.endsWithC })
    )({ multiple: true }),

    bar: composeValidators(
      startsWithA({ message: messages.bar.startsWithA }),
      endsWithC({ message: messages.bar.endsWithC })
    )({ multiple: true }),
  });

  const errorMessages = validator({ foo: 'BBB', bar: 'DDD' });

  t.deepEqual(errorMessages, {
    foo: [messages.foo.startsWithA, messages.foo.endsWithC],
    bar: [messages.bar.startsWithA, messages.bar.endsWithC],
  });
});

test('multiple object errors works for both fields', t => {
  const validator = combineValidators({
    foo: composeValidators({
      A: startsWithA({ message: messages.foo.startsWithA }),
      C: endsWithC({ message: messages.foo.endsWithC }),
    })({ multiple: true }),

    bar: composeValidators({
      A: startsWithA({ message: messages.bar.startsWithA }),
      C: endsWithC({ message: messages.bar.endsWithC }),
    })({ multiple: true }),
  });

  const errorMessages = validator({ foo: 'BBB', bar: 'DDD' });

  t.deepEqual(errorMessages, {
    foo: {
      A: messages.foo.startsWithA,
      C: messages.foo.endsWithC,
    },

    bar: {
      A: messages.bar.startsWithA,
      C: messages.bar.endsWithC,
    },
  });
});

test('multiple errors works for one field', t => {
  const validator = combineValidators({
    foo: composeValidators(
      startsWithA({ message: messages.foo.startsWithA }),
      endsWithC({ message: messages.foo.endsWithC })
    )(),

    bar: composeValidators(
      startsWithA({ message: messages.bar.startsWithA }),
      endsWithC({ message: messages.bar.endsWithC })
    )({ multiple: true }),
  });

  const errorMessages = validator({ foo: 'BBB', bar: 'DDD' });

  t.deepEqual(errorMessages, {
    foo: messages.foo.startsWithA,
    bar: [messages.bar.startsWithA, messages.bar.endsWithC],
  });
});
