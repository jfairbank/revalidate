# `createValidator`

The simplest function is `createValidator` which creates a value validation
function. `createValidator` takes two arguments. The first argument is a curried
function that takes an error message and the value. The curried function must
return the message if the value is invalid. If the field value is valid, it's
recommended that you return nothing, so a return value of `undefined` implies
the field value was valid.

The second argument is a function that takes a field name and must return the
error message. Optionally, you can just pass in a string as the second argument
if you don't want to depend on the field name.

The returned validation function is also a curried function. The first argument
is a field name string or a configuration object where you can specify the field
or a custom error message. The second argument is the value. You can pass in
both arguments at the same time too. We'll see why currying the function can be
useful when we want to compose validators.

Here is an implementation of an `isRequired` validator with `createValidator`:

```js
// ES2015 - import and define validator
import { createValidator } from 'revalidate';

const isRequired = createValidator(
  message => value => {
    if (value == null || value === '') {
      return message;
    }
  },

  field => `${field} is required`
);

// Or ES5 - require and define validator
var createValidator = require('revalidate').createValidator;

var isRequired = createValidator(
  function(message) {
    return function(value) {
      if (value == null || value === '') {
        return message;
      }
    };
  },

  function(field) {
    field + ' is required'
  }
);

// Using validator
isRequired('My Field')();     // 'My Field is required'
isRequired('My Field')('');   // 'My Field is required'
isRequired('My Field')('42'); // undefined, therefore assume valid

// With a custom message
isRequired({ message: 'Error' })(); // 'Error'
```

Validation functions can optionally accept a second parameter including all of
the current values. This allows comparing one value to another as part of
validation. For example:

```js
// ES2015
import { createValidator } from 'revalidate';

// Or ES5
var createValidator = require('revalidate').createValidator;

export default function matchesField(otherField, otherFieldLabel) {
  return createValidator(
    message => (value, allValues) => {
      if (!allValues || value !== allValues[otherField]) {
        return message;
      }
    },

    field => `${field} must match ${otherFieldLabel}`
  );
}

matchesField('password')('My Field')();
// 'My Field does not match'

matchesField('password')('My Field')('yes', { password: 'no' });
// 'My Field does not match'

matchesField('password')('My Field')('yes', { password: 'yes' });
// undefined, therefore assume valid

// With a custom message
matchesValue('password')({
  message: 'Passwords must match',
})('yes', { password: 'no' }); // 'Passwords must match'
```
