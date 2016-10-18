# `matchesField`

`matchesField` checks that a field matches another field's value. This is
perfect for password confirmation fields.

`matchesField` takes the name of the other field as the first argument and an
optional second argument for the other field's label. The returned functions are
like the other validation functions.

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
