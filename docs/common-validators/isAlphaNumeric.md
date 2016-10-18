# `isAlphaNumeric`

`isAlphaNumeric` simply tests that the value only contains any of the 26 letters
in the English alphabet or any numeric digit (i.e. 0-9).

```js
import { isAlphaNumeric } from 'revalidate';

isAlphaNumeric('My Field')('!@#$');
// 'My Field must be alphanumeric'
```
