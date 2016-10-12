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

it('multiple array errors works for both fields', () => {
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

  expect(errorMessages).toEqual({
    foo: [messages.foo.startsWithA, messages.foo.endsWithC],
    bar: [messages.bar.startsWithA, messages.bar.endsWithC],
  });
});

it('multiple object errors works for both fields', () => {
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

  expect(errorMessages).toEqual({
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

it('multiple errors works for one field', () => {
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

  expect(errorMessages).toEqual({
    foo: messages.foo.startsWithA,
    bar: [messages.bar.startsWithA, messages.bar.endsWithC],
  });
});
