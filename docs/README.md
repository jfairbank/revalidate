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

`yarn add revalidate`

`npm install --save revalidate`

## Table of Contents

- [Introduction](/README.md)
- [Getting Started](/getting-started.md)
- [Integrations](/integrations.md)
- [Usage](/usage/README.md)
  - [`createValidator`](/usage/createValidator.md)
  - [`composeValidators`](/usage/composeValidators.md)
  - [`combineValidators`](/usage/combineValidators.md)
  - [Nested Fields](/usage/nested-fields.md)
  - [Redux Form](/usage/redux-form.md)
  - [Immutable.js](/usage/immutable-js.md)
  - [Data Sources](/usage/data-sources.md)
- [Common Validators](/common-validators/README.md)
  - [`isRequired`](/common-validators/isRequired.md)
  - [`isRequiredIf`](/common-validators/isRequiredIf.md)
  - [`isAlphabetic`](/common-validators/isAlphabetic.md)
  - [`isAlphaNumeric`](/common-validators/isAlphaNumeric.md)
  - [`isNumeric`](/common-validators/isNumeric.md)
  - [`hasLengthBetween`](/common-validators/hasLengthBetween.md)
  - [`hasLengthGreaterThan`](/common-validators/hasLengthGreaterThan.md)
  - [`hasLengthLessThan`](/common-validators/hasLengthLessThan.md)
  - [`isOneOf`](/common-validators/isOneOf.md)
  - [`matchesPattern`](/common-validators/matchesPattern.md)
  - [`matchesField`](/common-validators/matchesField.md)
- [Test Helpers](/test-helpers/README.md)
  - [`hasError`](/test-helpers/hasError.md)
  - [`hasErrorAt`](/test-helpers/hasErrorAt.md)
  - [`hasErrorOnlyAt`](/test-helpers/hasErrorOnlyAt.md)
