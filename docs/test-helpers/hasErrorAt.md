# `hasErrorAt`

Use `hasErrorAt` with combined validators to assert a specific field has an
error. It takes two arguments, the validation result and the field key to check.
(**Note:** `hasErrorAt` only works with validators created from
`combineValidators`.)

```js
// ES2015
import { hasErrorAt } from 'revalidate/assertions';

// ES5
var hasErrorAt = require('revalidate/assertions').hasErrorAt;

// Missing name
const result = validateDog({
  age: '10',
  favorite: { meme: 'Doge' },
});

hasErrorAt(result, 'name');           // true
hasErrorAt(result, 'age');            // false
hasErrorAt(result, 'favorite.meme');  // false

// Error with age
const result = validateDog({
  name: 'Tucker',
  age: 'abc',
  favorite: { meme: 'Doge' },
});

hasErrorAt(result, 'name');           // false
hasErrorAt(result, 'age');            // true
hasErrorAt(result, 'favorite.meme');  // false

// Missing name and age
const result = validateDog({
  favorite: { meme: 'Doge' },
});

hasErrorAt(result, 'name');           // true
hasErrorAt(result, 'age');            // true
hasErrorAt(result, 'favorite.meme');  // false

// Missing nested field 'favorite.meme'
const result = validateDog({
  name: 'Tucker',
  age: '10',
});

hasErrorAt(result, 'name');           // false
hasErrorAt(result, 'age');            // false
hasErrorAt(result, 'favorite.meme');  // true

// All fields valid
const result = validateDog({
  name: 'Tucker',
  age: '10',
  favorite: { meme: 'Doge' },
});

hasErrorAt(result, 'name');           // false
hasErrorAt(result, 'age');            // false
hasErrorAt(result, 'favorite.meme');  // false
```
