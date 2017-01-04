## v1.1.0

### More customization with `createValidator`

* Credit: [@Zagitta](https://github.com/Zagitta).

Sometimes you may want to customize what your custom validator function takes as
a field label and what it returns for an error. Revalidate has always allowed
you to return something besides a string error message when validation fails.
For example, you can also return an object. This is especially useful for
internationalization with a library like
[react-intl](https://github.com/yahoo/react-intl). In addition to returning an
object, you can now also pass in an object for your field label. To do this
you'll need to pass in an object to your curried validation function with a
`field` property. The `field` property can then be an object (or another data
type). What you define `field` to be will be what is passed into your message
creator function. Here is a contrived example:

```js
const isRequired = createValidator(
  error => value => {
    if (value == null || value === '') {
      return error;
    }
  },

  // Instead of a string, config is the i18n config we
  // pass in to the curried validation function.
  config => config
);

const requiredName = isRequired({
  id: 'name',
  defaultMessage: 'Name is required',
});

requiredName('Jeremy');
// undefined

requiredName();
// { id: 'name', defaultMessage: 'Name is required' }
```

---

## v1.0.0

### :tada: First major release - NO breaking changes

Revalidate has been out for several months, and the API has stayed pretty solid.
With the addition of Immutable.js and arbitrary data source support along with
docs and Flow typechecking, I feel like revalidate is ready to be bumped to v1.

A couple internal helpful error messages were removed for being redundant or
unnecessary, but there weren't any real breaking changes in this release.
Therefore, you should be to upgrade with no problem.

### NEW - Immutable.js support

Revalidate now supports Immutable.js data structures for holding form values.
Simply import `combineValidators` from `revalidate/immutable` instead.

```js
// ES2015
import {
  createValidator,
  composeValidators,
  isRequired,
  isAlphabetic,
  isNumeric
} from 'revalidate';

import { combineValidators } from 'revalidate/immutable';
import { Map } from 'immutable';

// Or ES5
var r = require('revalidate');
var combineValidators = require('revalidate/immutable').combineValidators;
var createValidator = r.createValidator;
var composeValidators = r.composeValidators;
var isRequired = r.isRequired;
var isAlphabetic = r.isAlphabetic;
var isNumeric = r.isNumeric;

const dogValidator = combineValidators({
  name: composeValidators(
    isRequired,
    isAlphabetic
  )('Name'),

  age: isNumeric('Age')
});

dogValidator(Map()); // { name: 'Name is required' }

dogValidator(Map({ name: '123', age: 'abc' }));
// { name: 'Name must be alphabetic', age: 'Age must be numeric' }

dogValidator(Map({ name: 'Tucker', age: '10' })); // {}
```

### NEW - Arbitrary data sources

In fact, Immutable.js support is built upon a general method for using any data
source for form values. To use other data sources, simply supply a
`serializeValues` option to `combineValidators`. The example below wraps form
values with a thunk.

```js
// ES2015
import {
  createValidator,
  combineValidators,
  composeValidators,
  isRequired,
  isAlphabetic,
  isNumeric
} from 'revalidate';

// Or ES5
var r = require('revalidate');
var createValidator = r.createValidator;
var combineValidators = r.combineValidators;
var composeValidators = r.composeValidators;
var isRequired = r.isRequired;
var isAlphabetic = r.isAlphabetic;
var isNumeric = r.isNumeric;

const dogValidator = combineValidators({
  name: composeValidators(
    isRequired,
    isAlphabetic
  )('Name'),

  age: isNumeric('Age')
}, {
  // Values are wrapped with a function.
  // NOTE: our simple wrapper would only work for shallow field values.
  serializeValues: values => values(),
});

dogValidator(() => ({})); // { name: 'Name is required' }

dogValidator(() => ({ name: '123', age: 'abc' }));
// { name: 'Name must be alphabetic', age: 'Age must be numeric' }

dogValidator(() => ({ name: 'Tucker', age: '10' })); // {}
```

### Miscellaneous

- Add Flow typing
- Internal cleanup
- Migrate tests to Jest
- 100% code coverage!

## v0.4.1

### Bug Fixes

- Fix not being able to compose other composed validators (Issue #23).

## v0.4.0

### Test Helpers

Revalidate now includes some test helpers to make testing your validation
functions easier. You can import the helpers from `revalidate/assertions`. All
helpers return booleans.

#### `hasError`

Use `hasError` to assert that a validation result has at least one error. Negate
to assert there are no errors. The only argument is the validation result from
your validate function.

#### `hasErrorAt`

Use `hasErrorAt` with combined validators to assert a specific field has an
error. It takes two arguments, the validation result and the field key to check.
(**Note:** `hasErrorAt` only works with validators created from
`combineValidators`.)

#### `hasErrorOnlyAt`

Use `hasErrorOnlyAt` with combined validators to assert a specific field is the
**ONLY** error in the validation result. It takes two arguments, the validation
result and the field key to check.  (**Note:** `hasErrorOnlyAt` only works with
validators created from `combineValidators`.)

```js
// ES2015
import {
  hasError,
  hasErrorAt,
  hasErrorOnlyAt,
} from 'revalidate/assertions';

// ES5
var assertions = require('revalidate/assertions');
var hasError = assertions.hasError;
var hasErrorAt = assertions.hasErrorAt;
var hasErrorOnlyAt = assertions.hasErrorOnlyAt;

// Single validators
// =================
const validateName = isRequired('Name');

hasError(validateName(''));       // true
hasError(validateName('Tucker')); // false

// Composed validators
// ===================
const validateAge = composeValidators(
  isRequired,
  isNumeric
)('Age');

hasError(validateAge(''));    // true
hasError(validateAge('abc')); // true
hasError(validateAge('10'));  // false

// Composed validators with multiple errors
// ========================================
const validateAge = composeValidators(
  isRequired,
  isNumeric,
  hasLengthLessThan(3)
)('Age');

hasError(validateAge(''));            // true
hasError(validateAge('abc'));         // true
hasError(validateAge('100'));         // true
hasError(validateAge('one hundred')); // true
hasError(validateAge('10'));          // false

// Combined validators
// ===================
const validateDog = combineValidators({
  'name:' isRequired('Name'),

  'age:' composeValidators(
    isRequired,
    isNumeric
  )('Age'),

  'favorite.meme': isRequired('Favorite Meme'),
});

// Missing name
const result = validateDog({
  age: '10',
  favorite: { meme: 'Doge' },
});

hasError(result);// true

hasErrorAt(result, 'name');           // true
hasErrorAt(result, 'age');            // false
hasErrorAt(result, 'favorite.meme');  // false

hasErrorOnlyAt(result, 'name');           // true
hasErrorOnlyAt(result, 'age');            // false
hasErrorOnlyAt(result, 'favorite.meme');  // false

// Error with age
const result = validateDog({
  name: 'Tucker',
  age: 'abc',
  favorite: { meme: 'Doge' },
});

hasError(result); // true

hasErrorAt(result, 'name');           // false
hasErrorAt(result, 'age');            // true
hasErrorAt(result, 'favorite.meme');  // false

hasErrorOnlyAt(result, 'name');           // false
hasErrorOnlyAt(result, 'age');            // true
hasErrorOnlyAt(result, 'favorite.meme');  // false

// Missing name and age
const result = validateDog({
  favorite: { meme: 'Doge' },
});

hasError(result); // true

hasErrorAt(result, 'name');           // true
hasErrorAt(result, 'age');            // true
hasErrorAt(result, 'favorite.meme');  // false

hasErrorOnlyAt(result, 'name');           // false
hasErrorOnlyAt(result, 'age');            // false
hasErrorOnlyAt(result, 'favorite.meme');  // false

// Missing nested field 'favorite.meme'
const result = validateDog({
  name: 'Tucker',
  age: '10',
});

hasError(result); // true

hasErrorAt(result, 'name');           // false
hasErrorAt(result, 'age');            // false
hasErrorAt(result, 'favorite.meme');  // true

hasErrorOnlyAt(result, 'name');           // false
hasErrorOnlyAt(result, 'age');            // false
hasErrorOnlyAt(result, 'favorite.meme');  // true

// All fields valid
const result = validateDog({
  name: 'Tucker',
  age: '10',
  favorite: { meme: 'Doge' },
});

hasError(result); // false

hasErrorAt(result, 'name');           // false
hasErrorAt(result, 'age');            // false
hasErrorAt(result, 'favorite.meme');  // false

hasErrorOnlyAt(result, 'name');           // false
hasErrorOnlyAt(result, 'age');            // false
hasErrorOnlyAt(result, 'favorite.meme');  // false
```

### Dependency Tweaks

- Use lodash instead of individual lodash function packages.
- Remove object rest/spread in src to eliminate babel-runtime dependency.

## v0.3.0

### New Common Validators

#### `isRequiredIf`

`isRequiredIf` allows you to conditionally require a value based on the result
of a predicate function. As long as your predicate function returns a truthy
value, the field value will be required.

This is perfect if you want to require a field if another field value is
present:

```js
import { isRequiredIf } from 'revalidate';

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

#### `matchesPattern`

`matchesPattern` is a general purpose validator for validating values against
arbitrary regex patterns.

```js
import { matchesPattern } from 'revalidate';

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

---

### Return multiple errors as an object

In addition to returning multiple errors as an array with `composeValidators`,
you can also return multiple errors as an object now. This is useful if you want
to name your errors and react accordingly based on the type of error. Instead of
passing in validators as a variadic number of arguments, pass in all validators
inside an object. The keys of your object will the keys used in the error
object. Don't forget to still supply the `multiple: true` option!

```js
import { createValidator, composeValidators } from 'revalidate';

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

## v0.2.1

* Fix import bug in `matchesField` validator.

## v0.2.0

### Match all values

* Validation functions can now optionally accept a second parameter including
  all of the current values. This allows comparing one value to another as part
  of validation.
* Credit: [@boxfoot](https://github.com/boxfoot).

```js
import { createValidator } from 'revalidate';

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

### `matchesField` validator

* Since validation functions can now accept all values for comparing values,
  there is also a default implementation of the `matchesField` validator.
* Credit: [@boxfoot](https://github.com/boxfoot).

```js
import { matchesField } from 'revalidate';

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
import {
  combineValidators,
  isRequired,
  matchesField,
} from 'revalidate';

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

---

### Nested Fields
* Add support for deeply nested fields in objects and arrays with
  `combineValidators`.
  * To specify nested fields, just supply the path to the field with dots:
    `'contact.firstName'`.
  * For arrays of values you can use brace syntax: `'phones[]'`.
  * For nested fields of objects in arrays you can combine dots and braces:
    `'cars[].make'`.
  * You can combine and traverse as deep as you want:
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

## v0.1.0

* Add option to return multiple errors as an array from `composeValidators`
instead of stopping on the first error. Pass the option `multiple: true` in the
configuration object into the curried validator returned from
`composeValidators`:

```js
import { createValidator, composeValidators } from 'revalidate';

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
