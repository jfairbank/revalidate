# Data Sources

In fact, revalidate supports any arbitrary data source as long as you provide
the optional `serializeValues` option to the regular `combineValidators`
function.

```js
// ES2015
import {
  createValidator,
  combineValidators,
  composeValidators,
  isRequired,
  isAlphabetic,
  isNumeric
} from 'revalidate';

// Or ES5
var r = require('revalidate');
var createValidator = r.createValidator;
var combineValidators = r.combineValidators;
var composeValidators = r.composeValidators;
var isRequired = r.isRequired;
var isAlphabetic = r.isAlphabetic;
var isNumeric = r.isNumeric;

const dogValidator = combineValidators({
  name: composeValidators(
    isRequired,
    isAlphabetic
  )('Name'),

  age: isNumeric('Age')
}, {
  // Values are wrapped with a function.
  // NOTE: our simple wrapper would only work for shallow field values.
  serializeValues: values => values(),
});

dogValidator(() => ({})); // { name: 'Name is required' }

dogValidator(() => ({ name: '123', age: 'abc' }));
// { name: 'Name must be alphabetic', age: 'Age must be numeric' }

dogValidator(() => ({ name: 'Tucker', age: '10' })); // {}
```
