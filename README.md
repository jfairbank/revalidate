# <img src="https://raw.githubusercontent.com/jfairbank/revalidate/master/logo/logo.png" width="350" alt="revalidate">

[![Travis branch](https://img.shields.io/travis/jfairbank/revalidate/master.svg?style=flat-square)](https://travis-ci.org/jfairbank/revalidate)
[![npm](https://img.shields.io/npm/v/revalidate.svg?style=flat-square)](https://www.npmjs.com/package/revalidate)

Elegant and composable validations.

Revalidate was originally created as a helper library for composing and reusing
common validations to generate validate functions for
[redux-form](https://github.com/erikras/redux-form). It became evident that the
validators that revalidate can generate are pretty agnostic about how they are
used. They are just functions that take a value and return an error message if
the value is invalid.

## Install

    $ npm install revalidate

## Usage

Revalidate provides functions for creating validation functions as well as
composing and combining them. Think [redux](https://github.com/reactjs/redux)
for validation functions.

### `createValidator`

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

---

### `composeValidators`

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

---

### `combineValidators`

`combineValidators` is analogous to a function like `combineReducers` from
redux. It allows you to validate multiple field values at once. It returns a
function that takes an object with field names mapped to their values.
`combineValidators` will run named validators you supplied it with their
respective field values and return an object literal containing any error
messages for each field value. An empty object return value implies no field
values were invalid.

```js
// ES2015
import {
  createValidator,
  composeValidators,
  combineValidators,
  isRequired,
  isAlphabetic,
  isNumeric
} from 'revalidate';

// Or ES5
var r = require('revalidate');
var createValidator = r.createValidator;
var composeValidators = r.composeValidators;
var combineValidators = r.combineValidators;
var isRequired = r.isRequired;
var isAlphabetic = r.isAlphabetic;
var isNumeric = r.isNumeric;

// Usage
const dogValidator = combineValidators({
  // Use composeValidators too!
  name: composeValidators(
    isRequired,
    isAlphabetic
  )('Name'),

  // Don't forget to supply a field name if you
  // don't compose other validators
  age: isNumeric('Age')
});

dogValidator({}); // { name: 'Name is required' }

dogValidator({ name: '123', age: 'abc' });
// { name: 'Name must be alphabetic', age: 'Age must be numeric' }

dogValidator({ name: 'Tucker', age: '10' }); // {}
```

---

### Nested Fields

`combineValidators` also works with deeply nested fields in objects and arrays.

To specify nested fields, just supply the path to the field with dots:
`'contact.firstName'`.

For arrays of values you can use brace syntax: `'phones[]'`.

For nested fields of objects in arrays you can combine dots and braces:
`'cars[].make'`.

You can combine and traverse as deep as you want:
`'deeply.nested.list[].of.cats[].name'`!

```js
// ES2015
import {
  composeValidators,
  combineValidators,
  isRequired,
  isAlphabetic,
  isNumeric,
  isOneOf,
  matchesField,
} from 'revalidate';

// Or ES5
var r = require('revalidate');
var composeValidators = r.composeValidators;
var combineValidators = r.combineValidators;
var isRequired = r.isRequired;
var isAlphabetic = r.isAlphabetic;
var isNumeric = r.isNumeric;
var isOneOf = r.isOneOf;
var matchesField = r.matchesField;

// Usage
const validate = combineValidators({
  // Shallow fields work with nested fields still
  'favoriteMeme': isAlphabetic('Favorite Meme'),

  // Specify fields of nested object
  'contact.name': composeValidators(
    isRequired,
    isAlphabetic
  )('Contact Name'),

  'contact.age': isNumeric('Contact Age'),

  // Specify array of string values
  'phones[]': isNumeric('Phone'),

  // Specify nested fields of arrays of objects
  'cars[].make': composeValidators(
    isRequired,
    isOneOf(['Honda', 'Toyota', 'Ford'])
  )('Car Make'),

  // Match other nested field values
  'otherContact.name': matchesField(
    'contact.name',
    'Contact Name'
  )('Other Name'),
});

// Empty values
validate({});

// Empty arrays for phones and cars because no nested fields or values
// to be invalid. Message for required name on contact still shows up.
//
// { contact: { name: 'Contact Name is required' },
//   phones: [],
//   cars: [],
//   otherContact: {} }

// Invalid/missing values
validate({
  contact: { name: 'Joe', age: 'thirty' }, // Invalid age
  phones: ['abc', '123'],                 // First phone invalid
  cars: [{ make: 'Toyota' }, {}],         // Second car missing make
  otherContact: { name: 'Jeremy' },       // Names don't match
});

// Notice that array error messages match by index. For valid
// nested objects in arrays, you get get back an empty object
// for the index. For valid string values in arrays, you get
// back undefined for the index.
//
// { contact: { age: 'Contact Age must be numeric' },
//   phones: ['Phone must be numeric', undefined],
//   cars: [{}, { make: 'Car Make is required' }],
//   otherContact: { name: 'Other Name must match Contact Name' } }
```

---

### redux-form

As mentioned, even though revalidate is pretty agnostic about how you use it, it
does work out of the box for redux-form. The `validate` function you might write
for a redux-form example like
[here](http://erikras.github.io/redux-form/#/examples/synchronous-validation?_k=mncrmp)
can also be automatically generated with `combineValidators`. The function it
returns will work perfectly for the `validate` option for your form components
for React and redux-form.

Here is that example from redux-form rewritten to generate a `validate` function
with revalidate.

```js
import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {
  createValidator,
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthLessThan,
  isNumeric
} from 'revalidate';

export const fields = ['username', 'email', 'age'];

const isValidEmail = createValidator(
  message => value => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return message;
    }
  },
  'Invalid email address'
);

const isGreaterThan = (n) => createValidator(
  message => value => {
    if (value && Number(value) <= n) {
      return message;
    }
  },
  field => `${field} must be greater than ${n}`
);

const customIsRequired = isRequired({ message: 'Required' });

const validate = combineValidators({
  username: composeValidators(
    customIsRequired,

    hasLengthLessThan(16)({
      message: 'Must be 15 characters or less'
    })
  )(),

  email: composeValidators(
    customIsRequired,
    isValidEmail
  )(),

  age: composeValidators(
    customIsRequired,

    isNumeric({
      message: 'Must be a number'
    }),

    isGreaterThan(17)({
      message: 'Sorry, you must be at least 18 years old'
    })
  )()
});

class SynchronousValidationForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  };

  render() {
    const {fields: {username, email, age}, resetForm, handleSubmit, submitting} = this.props;
    return (<form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <div>
            <input type="text" placeholder="Username" {...username}/>
          </div>
          {username.touched && username.error && <div>{username.error}</div>}
        </div>
        <div>
          <label>Email</label>
          <div>
            <input type="text" placeholder="Email" {...email}/>
          </div>
          {email.touched && email.error && <div>{email.error}</div>}
        </div>
        <div>
          <label>Age</label>
          <div>
            <input type="text" placeholder="Age" {...age}/>
          </div>
          {age.touched && age.error && <div>{age.error}</div>}
        </div>
        <div>
          <button type="submit" disabled={submitting}>
            {submitting ? <i/> : <i/>} Submit
          </button>
          <button type="button" disabled={submitting} onClick={resetForm}>
            Clear Values
          </button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'synchronousValidation',
  fields,
  validate
})(SynchronousValidationForm);
```

## Common Validators

Revalidate exports some common validations for your convenience. If you need
something more complex, then you'll need to create your own validators with
`createValidator`.

### `isRequired`

`isRequired` is pretty self explanatory. It determines that a value isn't valid
if it's `null`, `undefined` or the empty string `''`.

```js
isRequired('My Field')();     // 'My Field is required'
isRequired('My Field')(null); // 'My Field is required'
isRequired('My Field')('');   // 'My Field is required'
isRequired('My Field')('42'); // undefined, therefore assume valid
```

### `hasLengthBetween`

`hasLengthBetween` tests that the value falls between a min and max inclusively.
It wraps a call to `createValidator`, so you must first call it with the min and
max arguments.

```js
hasLengthBetween(1, 3)('My Field')('hello');
// 'My Field must be between 1 and 3 characters long'
```

### `hasLengthGreaterThan`

`hasLengthGreaterThan` tests that the value is greater than a predefined length.
It wraps a call to `createValidator`, so you must first call it with the
min length.

```js
hasLengthGreaterThan(3)('My Field')('foo');
// 'My Field must be longer than 3 characters'
```

### `hasLengthLessThan`

`hasLengthLessThan` tests that the value is less than a predefined length. It
wraps a call to `createValidator`, so you must first call it with the max
length.

```js
hasLengthLessThan(4)('My Field')('hello');
// 'My Field cannot be longer than 4 characters'
```

### `isAlphabetic`

`isAlphabetic` simply tests that the value only contains any of the 26 letters
in the English alphabet.

```js
isAlphabetic('My Field')('1');
// 'My Field must be alphabetic'
```

### `isAlphaNumeric`

`isAlphaNumeric` simply tests that the value only contains any of the 26 letters
in the English alphabet or any numeric digit (i.e. 0-9).

```js
isAlphaNumeric('My Field')('!@#$');
// 'My Field must be alphanumeric'
```

### `isNumeric`

`isNumeric` simply tests that the **string** is comprised of only digits (i.e.
0-9).

```js
isNumeric('My Field')('a');
// 'My Field must be numeric'
```

### `isOneOf`

`isOneOf` tests that the value is contained in a predefined array of values. It
wraps a call to `createValidator`, so you must first call it with the array of
allowed values.

```js
isOneOf(['foo', 'bar'])('My Field')('baz');
// 'My Field must be one of ["foo","bar"]'

isOneOf(['foo', 'bar'])('My Field')('FOO');
// 'My Field must be one of ["foo","bar"]'
```

By default it does a sameness equality (i.e. `===`) **with** case sensitivity
for determining if a value is valid. You can supply an optional second argument
function to define how values should be compared. The comparer function takes
the field value as the first argument and each valid value as the second
argument. You could use this to make values case insensitive. Returning a truthy
value in a comparison means that the field value is valid.

```js
const validator = isOneOf(
  ['foo', 'bar'],

  (value, validValue) => (
    value && value.toLowerCase() === validValue.toLowerCase()
  )
);

validator('My Field')('FOO'); // undefined, so valid
```

### `matchesField`

`matchesField` checks that a field matches another field's value. This is
perfect for password confirmation fields.

`matchesField` takes the name of the other field as the first argument and an
optional second argument for the other field's label. The returned functions are
like the other validation functions.

```js
// Example 1
// =========
matchesField(
  'password', // other field name
  'Password'  // other field label - optional
)('Password Confirmation')('yes', { password: 'no' });
//         ▲                 ▲                 ▲
//         |                 |                 |
//         |                 |                 |
//  this field name     this field value   other field value

// returns 'Password Confirmation does not match Password'

// ---------------------------------------------------------------------------

// Example 2
// =========
matchesField('password')('Password Confirmation')('yes', { password: 'yes' });
// undefined, so valid
```

With `combineValidators`:

```js
// ES2015
import {
  combineValidators,
  isRequired,
  matchesField,
} from 'revalidate';

// Or ES5
var r = require('revalidate');
var combineValidators = r.combineValidators;
var isRequired = r.isRequired;
var matchesField = r.matchesField;

// Usage
const validate = combineValidators({
  password: isRequired('Password'),

  confirmPassword: matchesField('password')({
    message: 'Passwords do not match',
  }),
});

validate({
  password: 'helloworld',
  confirmPassword: 'helloworld',
}); // {}, so valid

validate({
  password: 'helloworld',
  confirmPassword: 'holamundo',
}); // { confirmPassword: 'Passwords do not match' }
```

### `isRequiredIf`

`isRequiredIf` allows you to conditionally require a value based on the result
of a predicate function. As long as your predicate function returns a truthy
value, the field value will be required.

This is perfect if you want to require a field if another field value is
present:

```js
const validator = combineValidators({
  username: isRequiredIf(
    values => values && !values.useEmailAsUsername
  )('Username'),
});

validator(); // { username: 'Username is required' }

validator({
  useEmailAsUsername: false,
}); // { username: 'Username is required' }

validator({
  username: 'jfairbank',
  useEmailAsUsername: false,
}); // {}

validator({
  useEmailAsUsername: true,
}); // {}, so valid
```

If you compose `isRequiredIf` with `composeValidators`, your other validations
will still run even if your field isn't required:

```js
const validator = combineValidators({
  username: composeValidators(
    isRequiredIf(values => values && !values.useEmailAsUsername),
    isAlphabetic
  )('Username'),
});

// Field is required
validator({
  username: '123',
  useEmailAsUsername: false,
}); // { username: 'Username must be alphabetic' }

// Field is not required
validator({
  username: '123',
  useEmailAsUsername: true,
}); // { username: 'Username must be alphabetic' }
```

### `matchesPattern`

`matchesPattern` is a general purpose validator for validating values against
arbitrary regex patterns.

```js
const isAlphabetic = matchesPattern(/^[A-Za-z]+$/)('Username');

isAlphabetic('abc'); // undefined, so valid
isAlphabetic('123'); // 'Username must match pattern /^[A-Za-z]+$/'
```

**Note:** `matchesPattern` does not require a value, so falsy values will pass.

```js
isAlphabetic();      // undefined because not required, so valid
isAlphabetic(null);  // undefined because not required, so valid
isAlphabetic('');    // undefined because not required, so valid
```
