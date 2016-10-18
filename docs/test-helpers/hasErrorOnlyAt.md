# `hasErrorOnlyAt`

Use `hasErrorOnlyAt` with combined validators to assert a specific field is the
**ONLY** error in the validation result. It takes two arguments, the validation
result and the field key to check.  (**Note:** `hasErrorOnlyAt` only works with
validators created from `combineValidators`.)

```js
// ES2015
import { hasErrorOnlyAt } from 'revalidate/assertions';

// ES5
var hasErrorOnlyAt = require('revalidate/assertions').hasErrorOnlyAt;

// Missing name
const result = validateDog({
  age: '10',
  favorite: { meme: 'Doge' },
});

hasErrorOnlyAt(result, 'name');           // true
hasErrorOnlyAt(result, 'age');            // false
hasErrorOnlyAt(result, 'favorite.meme');  // false

// Error with age
const result = validateDog({
  name: 'Tucker',
  age: 'abc',
  favorite: { meme: 'Doge' },
});

hasErrorOnlyAt(result, 'name');           // false
hasErrorOnlyAt(result, 'age');            // true
hasErrorOnlyAt(result, 'favorite.meme');  // false

// Missing name and age
// Notice here that all checks return false because
// there are 2 errors
const result = validateDog({
  favorite: { meme: 'Doge' },
});

hasErrorOnlyAt(result, 'name');           // false
hasErrorOnlyAt(result, 'age');            // false
hasErrorOnlyAt(result, 'favorite.meme');  // false

// Missing nested field 'favorite.meme'
const result = validateDog({
  name: 'Tucker',
  age: '10',
});

hasErrorOnlyAt(result, 'name');           // false
hasErrorOnlyAt(result, 'age');            // false
hasErrorOnlyAt(result, 'favorite.meme');  // true

// All fields valid
const result = validateDog({
  name: 'Tucker',
  age: '10',
  favorite: { meme: 'Doge' },
});

hasErrorOnlyAt(result, 'name');           // false
hasErrorOnlyAt(result, 'age');            // false
hasErrorOnlyAt(result, 'favorite.meme');  // false
```
