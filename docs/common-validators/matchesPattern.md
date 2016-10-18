# `matchesPattern`

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
