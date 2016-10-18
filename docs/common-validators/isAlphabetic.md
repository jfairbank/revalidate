# `isAlphabetic`

`isAlphabetic` simply tests that the value only contains any of the 26 letters
in the English alphabet.

```js
import { isAlphabetic } from 'revalidate';

isAlphabetic('My Field')('1');
// 'My Field must be alphabetic'
```
