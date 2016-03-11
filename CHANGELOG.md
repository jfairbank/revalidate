## v0.1.0

* Add option to return multiple errors as an array from `composeValidators`
instead of stopping on the first error. Pass the option `multiple: true` in the
configuration object into the curried validator returned from
`composeValidators`:

```js
import { createValidator, composeValidators } from 'revalidate';

const startsWithA = createValidator(
  message => value => {
    if (value && !/^A/.test(value)) {
      return message;
    }
  },
  field => `${field} must start with A`
);

const endsWithC = createValidator(
  message => value => {
    if (value && !/C$/.test(value)) {
      return message;
    }
  },
  field => `${field} must end with C`
);

const validator = composeValidators(
  startsWithA,
  endsWithC
)({ field: 'My Field', multiple: true });

validator('BBB');
// [
//   'My Field must start with A',
//   'My Field must end with C'
// ]
```
