# `isRequiredIf`

`isRequiredIf` allows you to conditionally require a value based on the result
of a predicate function. As long as your predicate function returns a truthy
value, the field value will be required.

This is perfect if you want to require a field if another field value is
present:

```js
import { isRequiredIf } from 'revalidate';

const validator = combineValidators({
  username: isRequiredIf(
    values => values && !values.useEmailAsUsername
  )('Username'),
});

validator(); // { username: 'Username is required' }

validator({
  useEmailAsUsername: false,
}); // { username: 'Username is required' }

validator({
  username: 'jfairbank',
  useEmailAsUsername: false,
}); // {}

validator({
  useEmailAsUsername: true,
}); // {}, so valid
```

If you compose `isRequiredIf` with `composeValidators`, your other validations
will still run even if your field isn't required:

```js
const validator = combineValidators({
  username: composeValidators(
    isRequiredIf(values => values && !values.useEmailAsUsername),
    isAlphabetic
  )('Username'),
});

// Field is required
validator({
  username: '123',
  useEmailAsUsername: false,
}); // { username: 'Username must be alphabetic' }

// Field is not required
validator({
  username: '123',
  useEmailAsUsername: true,
}); // { username: 'Username must be alphabetic' }
```
