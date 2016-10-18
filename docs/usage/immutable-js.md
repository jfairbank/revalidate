# Immutable.js

Revalidate supports Immutable.js as a data source for your form values. To
integrate revalidate with Immutable.js, simply import `combineValidators` from
`revalidate/immutable`.

```js
// ES2015
import {
  createValidator,
  composeValidators,
  isRequired,
  isAlphabetic,
  isNumeric
} from 'revalidate';

import { combineValidators } from 'revalidate/immutable';
import { Map } from 'immutable';

// Or ES5
var r = require('revalidate');
var combineValidators = require('revalidate/immutable').combineValidators;
var createValidator = r.createValidator;
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
});

dogValidator(Map()); // { name: 'Name is required' }

dogValidator(Map({ name: '123', age: 'abc' }));
// { name: 'Name must be alphabetic', age: 'Age must be numeric' }

dogValidator(Map({ name: 'Tucker', age: '10' })); // {}
```
