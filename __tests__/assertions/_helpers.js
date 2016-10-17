// @flow
import {
  combineValidators,
  composeValidators,
  isAlphabetic,
  isNumeric,
  isRequired,
} from '../../src';

import { startsWithA, endsWithC } from '../helpers/validators';

export const singleRequiredValidator = isRequired('Field');

export const unconfiguredArrayComposedValidator = composeValidators(
  isRequired,
  isAlphabetic
);

export const unconfiguredObjectComposedValidator = composeValidators({
  isRequired,
  isAlphabetic,
});

export const composedValidator = unconfiguredArrayComposedValidator('Field');

export const multipleArrayComposedValidator = unconfiguredArrayComposedValidator({
  field: 'Field',
  multiple: true,
});

export const multipleObjectComposedValidator = unconfiguredObjectComposedValidator({
  field: 'Field',
  multiple: true,
});

export const combinedValidator = combineValidators({
  'contact.name': isRequired('Name'),

  'contact.age': composeValidators(
    isRequired,
    isNumeric
  )('Age'),

  'phraseArray': composeValidators(
    startsWithA,
    endsWithC
  )({ field: 'Phrase Array', multiple: true }),

  'phraseObject': composeValidators({
    startsWithA,
    endsWithC,
  })({ field: 'Phrase Object', multiple: true }),

  'favoriteMeme': isRequired('Favorite Meme'),
});

export const validCombinedData = {
  contact: {
    name: 'John Doe',
    age: '30',
  },

  phraseArray: 'ABC',
  phraseObject: 'ABC',
  favoriteMeme: 'Doge',
};
