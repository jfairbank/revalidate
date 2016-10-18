# `isNumeric`

`isNumeric` simply tests that the **string** is comprised of only digits (i.e.
0-9).

```js
import { isNumeric } from 'revalidate';

isNumeric('My Field')('a');
// 'My Field must be numeric'
```
