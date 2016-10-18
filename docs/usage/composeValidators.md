# `composeValidators`

Revalidate becomes really useful when you use the `composeValidators` function.
As the name suggests, it allows you to compose validators into one. By default
the composed validator will check each validator and return the first error
message it encounters. Validators are checked in a left-to-right fashion to
make them more readable. (**Note:** this is opposite most functional
implementations of the compose function.)

The composed validator is also curried and takes the same arguments as an
individual validator made with `createValidator`.

```js
// ES2015
import {
  createValidator,
  composeValidators,
  isRequired
} from 'revalidate';

// Or ES5
var r = require('revalidate');
var createValidator = r.createValidator;
var composeValidators = r.composeValidators;
var isRequired = r.isRequired;

// Usage
const isAlphabetic = createValidator(
  message => value => {
    if (value && !/^[A-Za-z]+$/.test(value)) {
      return message;
    }
  },

  field => `${field} must be alphabetic`
);

const validator = composeValidators(
  isRequired,

  // You can still customize individual validators
  // because they're curried!
  isAlphabetic({
    message: 'Can only contain letters'
  })
)('My Field');

validator();      // 'My Field is required'
validator('123'); // 'Can only contain letters'
validator('abc'); // undefined
```

#### Multiple Errors as an Array

You can supply an additional `multiple: true` option to return all errors as an
array from your composed validators. This will run all composed validations
instead of stopping at the first one that fails.

```js
// ES2015
import { createValidator, composeValidators } from 'revalidate';

// Or ES5
var r = require('revalidate');
var createValidator = r.createValidator;
var composeValidators = r.composeValidators;

// Usage
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
)({ field: 'My Field', multiple: true });

validator('BBB');
// [
//   'My Field must start with A',
//   'My Field must end with C'
// ]
```

#### Multiple Errors as an Object

Alternatively, if you want to be able to reference specific errors, you can
return multiple errors as an object, thereby allowing you to name the errors. To
return multiple errors as an object, pass in your validators as an object to
`composeValidators` instead of a variadic number of arguments. The keys you use
in your object will be the keys in the returned errors object. Don't forget to
still supply the `multiple: true` option!

```js
const validator = composeValidators({
  A: startsWithA,
  C: endsWithC
})({ field: 'My Field', multiple: true });

validator('BBB');
// {
//   A: 'My Field must start with A',
//   C: 'My Field must end with C'
// }
```
