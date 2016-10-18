# `hasLengthGreaterThan`

`hasLengthGreaterThan` tests that the value is greater than a predefined length.
It wraps a call to `createValidator`, so you must first call it with the
min length.

```js
import { hasLengthGreaterThan } from 'revalidate';

hasLengthGreaterThan(3)('My Field')('foo');
// 'My Field must be longer than 3 characters'
```
