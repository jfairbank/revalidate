# `hasLengthLessThan`

`hasLengthLessThan` tests that the value is less than a predefined length. It
wraps a call to `createValidator`, so you must first call it with the max
length.

```js
import { hasLengthLessThan } from 'revalidate';

hasLengthLessThan(4)('My Field')('hello');
// 'My Field cannot be longer than 3 characters'
```
