# `isOneOf`

`isOneOf` tests that the value is contained in a predefined array of values. It
wraps a call to `createValidator`, so you must first call it with the array of
allowed values.

```js
import { isOneOf } from 'revalidate';

isOneOf(['foo', 'bar'])('My Field')('baz');
// 'My Field must be one of ["foo","bar"]'

isOneOf(['foo', 'bar'])('My Field')('FOO');
// 'My Field must be one of ["foo","bar"]'
```

By default it does a sameness equality (i.e. `===`) **with** case sensitivity
for determining if a value is valid. You can supply an optional second argument
function to define how values should be compared. The comparer function takes
the field value as the first argument and each valid value as the second
argument. You could use this to make values case insensitive. Returning a truthy
value in a comparison means that the field value is valid.

```js
const validator = isOneOf(
  ['foo', 'bar'],

  (value, validValue) => (
    value && value.toLowerCase() === validValue.toLowerCase()
  )
);

validator('My Field')('FOO'); // undefined, so valid
```
