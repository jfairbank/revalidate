# Redux Form

As mentioned, even though revalidate is pretty agnostic about how you use it, it
does work out of the box for Redux Form. The `validate` function you might write
for a Redux Form example like
[here](http://redux-form.com/6.1.1/examples/syncValidation) can also be
automatically generated with `combineValidators`. The function it returns will
work perfectly for the `validate` option for your form components for React and
Redux Form.

Here is that example from Redux Form rewritten to generate a `validate` function
with revalidate for both Redux Form v6 and v5.

## Redux Form v6

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
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
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

## Redux Form v5

```js
import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {
  createValidator,
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthLessThan,
  isNumeric
} from 'revalidate';

export const fields = ['username', 'email', 'age'];

const isValidEmail = createValidator(
  message => value => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return message;
    }
  },
  'Invalid email address'
);

const isGreaterThan = (n) => createValidator(
  message => value => {
    if (value && Number(value) <= n) {
      return message;
    }
  },
  field => `${field} must be greater than ${n}`
);

const customIsRequired = isRequired({ message: 'Required' });

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
});

class SynchronousValidationForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  };

  render() {
    const {fields: {username, email, age}, resetForm, handleSubmit, submitting} = this.props;
    return (<form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <div>
            <input type="text" placeholder="Username" {...username}/>
          </div>
          {username.touched && username.error && <div>{username.error}</div>}
        </div>
        <div>
          <label>Email</label>
          <div>
            <input type="text" placeholder="Email" {...email}/>
          </div>
          {email.touched && email.error && <div>{email.error}</div>}
        </div>
        <div>
          <label>Age</label>
          <div>
            <input type="text" placeholder="Age" {...age}/>
          </div>
          {age.touched && age.error && <div>{age.error}</div>}
        </div>
        <div>
          <button type="submit" disabled={submitting}>
            {submitting ? <i/> : <i/>} Submit
          </button>
          <button type="button" disabled={submitting} onClick={resetForm}>
            Clear Values
          </button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'synchronousValidation',
  fields,
  validate
})(SynchronousValidationForm);
```
