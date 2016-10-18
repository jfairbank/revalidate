# `hasLengthBetween`

`hasLengthBetween` tests that the value falls between a min and max inclusively.
It wraps a call to `createValidator`, so you must first call it with the min and
max arguments.

```js
import { hasLengthBetween } from 'revalidate';

hasLengthBetween(1, 3)('My Field')('hello');
// 'My Field must be between 1 and 3 characters long'
```
