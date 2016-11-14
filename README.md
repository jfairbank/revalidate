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

## Redux Form

Just one more example! You might have heard about revalidate through Redux Form.
Revalidate was originally conceived as a library for writing validation
functions for Redux Form. Revalidate is still a great companion to Redux Form!
Here is the simple synchronous form validation from Redux Form's
[docs](http://redux-form.com/6.1.1/examples/syncValidation) rewritten to use
revalidate:

```js
import React from 'react'
import { Field, reduxForm } from 'redux-form'

import {
  createValidator,
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthLessThan,
  isNumeric
} from 'revalidate'

const isValidEmail = createValidator(
  message => value => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return message
    }
  },
  'Invalid email address'
)

const isGreaterThan = (n) => createValidator(
  message => value => {
    if (value && Number(value) <= n) {
      return message
    }
  },
  field => `${field} must be greater than ${n}`
)

const customIsRequired = isRequired({ message: 'Required' })

const validate = combineValidators({
  username: composeValidators(
    customIsRequired,

    hasLengthLessThan(16)({
      message: 'Must be 15 characters or less'
    })
  )(),

  email: composeValidators(
    customIsRequired,
    isValidEmail
  )(),

  age: composeValidators(
    customIsRequired,

    isNumeric({
      message: 'Must be a number'
    }),

    isGreaterThan(17)({
      message: 'Sorry, you must be at least 18 years old'
    })
  )()
})

const warn = values => {
  const warnings = {}
  if (values.age < 19) {
    warnings.age = 'Hmm, you seem a bit young...'
  }
  return warnings
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const SyncValidationForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="username" type="text" component={renderField} label="Username"/>
      <Field name="email" type="email" component={renderField} label="Email"/>
      <Field name="age" type="number" component={renderField} label="Age"/>
      <div>
        <button type="submit" disabled={submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'syncValidation',  // a unique identifier for this form
  validate,                // <--- validation function given to redux-form
  warn                     // <--- warning function given to redux-form
})(SyncValidationForm)
```
