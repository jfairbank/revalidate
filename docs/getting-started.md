# Getting Started

## Install

The recommended way to install revalidate is with a package manager like yarn or
npm.

### yarn

```
yarn add revalidate
```

### npm

```
npm install --save revalidate
```

## Simple Example

Revalidate exports a few helper functions like `createValidator`,
`composeValidators`, and `combineValidators` for creating and composing
validators along with some common validations such as `isRequired` and
`isAlphabetic`.

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
  name: composeValidators(
    isRequired,
    isAlphabetic
  )('Name'),

  age: isNumeric('Age')
});

dogValidator({}); // { name: 'Name is required' }

dogValidator({ name: '123', age: 'abc' });
// { name: 'Name must be alphabetic', age: 'Age must be numeric' }

dogValidator({ name: 'Tucker', age: '10' }); // {}
```
