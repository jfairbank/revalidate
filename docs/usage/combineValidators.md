# `combineValidators`

`combineValidators` is analogous to a function like `combineReducers` from
redux. It allows you to validate multiple field values at once. It returns a
function that takes an object with field names mapped to their values.
`combineValidators` will run named validators you supplied it with their
respective field values and return an object literal containing any error
messages for each field value. An empty object return value implies no field
values were invalid.

```js
// ES2015
import {
  createValidator,
  composeValidators,
  combineValidators,
  isRequired,
  isAlphabetic,
  isNumeric
} from 'revalidate';

// Or ES5
var r = require('revalidate');
var createValidator = r.createValidator;
var composeValidators = r.composeValidators;
var combineValidators = r.combineValidators;
var isRequired = r.isRequired;
var isAlphabetic = r.isAlphabetic;
var isNumeric = r.isNumeric;

// Usage
const dogValidator = combineValidators({
  // Use composeValidators too!
  name: composeValidators(
    isRequired,
    isAlphabetic
  )('Name'),

  // Don't forget to supply a field name if you
  // don't compose other validators
  age: isNumeric('Age')
});

dogValidator({}); // { name: 'Name is required' }

dogValidator({ name: '123', age: 'abc' });
// { name: 'Name must be alphabetic', age: 'Age must be numeric' }

dogValidator({ name: 'Tucker', age: '10' }); // {}
```
