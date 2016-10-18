# <img src="https://raw.githubusercontent.com/jfairbank/revalidate/master/logo/logo.png" width="350" alt="revalidate">

[![npm](https://img.shields.io/npm/v/revalidate.svg?style=flat-square)](https://www.npmjs.com/package/revalidate)
[![Travis branch](https://img.shields.io/travis/jfairbank/revalidate/master.svg?style=flat-square)](https://travis-ci.org/jfairbank/revalidate)
[![Codecov](https://img.shields.io/codecov/c/github/jfairbank/revalidate.svg?style=flat-square)](https://codecov.io/gh/jfairbank/revalidate)

#### Elegant and composable validations.

Revalidate is a library for creating and composing together small validation
functions to create complex, robust validations. There is no need for awkward
configuration rules to define validations. Just use functions.

All right. No more upselling. Just look at an example :heart:.

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

## Install

Install with yarn or npm.

```
yarn add revalidate
```

```
npm install --save revalidate
```

## Getting Started

#### [Docs](http://revalidate.jeremyfairbank.com)

Revalidate has a host of options along with helper functions for building
validations and some common validation functions right out of the box. To learn
more, check out the docs at [revalidate.jeremyfairbank.com](http://revalidate.jeremyfairbank.com).
