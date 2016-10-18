# `isRequired`

`isRequired` is pretty self explanatory. It determines that a value isn't valid
if it's `null`, `undefined` or the empty string `''`.

```js
import { isRequired } from 'revalidate';

isRequired('My Field')();     // 'My Field is required'
isRequired('My Field')(null); // 'My Field is required'
isRequired('My Field')('');   // 'My Field is required'
isRequired('My Field')('42'); // undefined, therefore assume valid
```
