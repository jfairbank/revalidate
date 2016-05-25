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
