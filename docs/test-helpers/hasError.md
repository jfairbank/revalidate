# `hasError`

Use `hasError` to assert that a validation result has at least one error. Negate
to assert there are no errors. The only argument is the validation result from
your validate function.

```js
// ES2015
import { hasError } from 'revalidate/assertions';

// ES5
var hasError = require('revalidate/assertions').hasError;

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

// Missing name, returns true
hasError(validateDog({
  age: '10',
  favorite: { meme: 'Doge' },
}));

// Error with age, returns true
hasError(validateDog({
  name: 'Tucker',
  age: 'abc',
  favorite: { meme: 'Doge' },
}));

// Missing name and age, returns true
hasError(validateDog({
  favorite: { meme: 'Doge' },
}));

// Missing nested field 'favorite.meme', returns true
hasError(validateDog({
  name: 'Tucker',
  age: '10',
}));

// All fields valid, returns false
hasError(validateDog({
  name: 'Tucker',
  age: '10',
  favorite: { meme: 'Doge' },
}));
```
