import {
  composeValidators,
  isAlphabetic,
  isNumeric,
  isOneOf,
  isRequired,
  isRequiredIf,
  matchesField,
} from '../../src';

export const validatePersonDefinition = {
  name: composeValidators(
    isRequired,
    isAlphabetic
  )('Name'),

  confirmName: matchesField('name')({ message: 'Confirm Your Name' }),
  age: isNumeric('Age'),

  job: isRequiredIf(
    values => values && Number(values.age) >= 18
  )('Job'),
};

export const deepValidateDefinition = {
  'shallow': isAlphabetic('Shallow Prop'),

  'contact.name': composeValidators(
    isRequired,
    isAlphabetic
  )('Contact Name'),

  'contact.age': isNumeric('Contact Age'),

  'cars[].make': composeValidators(
    isRequired,
    isOneOf(['Honda', 'Toyota', 'Ford'])
  )('Car Make'),

  'deeply.nested[].list.cats[].name': isRequired('Cat Name'),

  'phones[]': isNumeric('Phone'),

  'otherContact.name': matchesField('contact.name')('Other Name'),
};
