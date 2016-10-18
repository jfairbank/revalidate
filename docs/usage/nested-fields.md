# Nested Fields

`combineValidators` also works with deeply nested fields in objects and arrays.

To specify nested fields, just supply the path to the field with dots:
`'contact.firstName'`.

For arrays of values you can use brace syntax: `'phones[]'`.

For nested fields of objects in arrays you can combine dots and braces:
`'cars[].make'`.

You can combine and traverse as deep as you want:
`'deeply.nested.list[].of.cats[].name'`!

```js
// ES2015
import {
  composeValidators,
  combineValidators,
  isRequired,
  isAlphabetic,
  isNumeric,
  isOneOf,
  matchesField,
} from 'revalidate';

// Or ES5
var r = require('revalidate');
var composeValidators = r.composeValidators;
var combineValidators = r.combineValidators;
var isRequired = r.isRequired;
var isAlphabetic = r.isAlphabetic;
var isNumeric = r.isNumeric;
var isOneOf = r.isOneOf;
var matchesField = r.matchesField;

// Usage
const validate = combineValidators({
  // Shallow fields work with nested fields still
  'favoriteMeme': isAlphabetic('Favorite Meme'),

  // Specify fields of nested object
  'contact.name': composeValidators(
    isRequired,
    isAlphabetic
  )('Contact Name'),

  'contact.age': isNumeric('Contact Age'),

  // Specify array of string values
  'phones[]': isNumeric('Phone'),

  // Specify nested fields of arrays of objects
  'cars[].make': composeValidators(
    isRequired,
    isOneOf(['Honda', 'Toyota', 'Ford'])
  )('Car Make'),

  // Match other nested field values
  'otherContact.name': matchesField(
    'contact.name',
    'Contact Name'
  )('Other Name'),
});

// Empty values
validate({});

// Empty arrays for phones and cars because no nested fields or values
// to be invalid. Message for required name on contact still shows up.
//
// { contact: { name: 'Contact Name is required' },
//   phones: [],
//   cars: [],
//   otherContact: {} }

// Invalid/missing values
validate({
  contact: { name: 'Joe', age: 'thirty' }, // Invalid age
  phones: ['abc', '123'],                 // First phone invalid
  cars: [{ make: 'Toyota' }, {}],         // Second car missing make
  otherContact: { name: 'Jeremy' },       // Names don't match
});

// Notice that array error messages match by index. For valid
// nested objects in arrays, you get get back an empty object
// for the index. For valid string values in arrays, you get
// back undefined for the index.
//
// { contact: { age: 'Contact Age must be numeric' },
//   phones: ['Phone must be numeric', undefined],
//   cars: [{}, { make: 'Car Make is required' }],
//   otherContact: { name: 'Other Name must match Contact Name' } }
```
