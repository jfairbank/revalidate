// @flow
import { fromJS } from 'immutable';
import omit from 'lodash/omit';
import isPlainObject from 'lodash/isPlainObject';
import { combineValidators } from '../../src/immutable';
import { deepValidateDefinition } from './_helpers';

const deepValidate = combineValidators(deepValidateDefinition);

const validValues = {
  shallow: 'hello',

  contact: {
    name: 'Joe',
    age: '29',
  },

  cars: [
    { make: 'Toyota' },
  ],

  deeply: {
    nested: [
      {
        list: {
          cats: [
            { name: 'Gorby' },
          ],
        },
      },
    ],
  },

  phones: ['123'],

  otherContact: { name: 'Joe' },
};

const validResult = {
  contact: {},
  cars: [{}],
  deeply: {
    nested: [
      {
        list: {
          cats: [{}],
        },
      },
    ],
  },
  phones: [undefined],
  otherContact: {},
};

describe('with immutable form values', () => {
  it('returns empty objects for valid fields', () => {
    expect(deepValidate(fromJS(validValues))).toEqual(validResult);
  });

  it('returns error value for shallow prop if invalid', () => {
    const allErrors = deepValidate(fromJS({ ...validValues, shallow: '123' }));

    expect(typeof allErrors.shallow).toBe('string');
    expect(allErrors.shallow.length > 1).toBe(true);

    expect(omit(allErrors, 'shallow')).toEqual(omit(validResult, 'shallow'));
  });

  it('returns non empty object with error message for invalid contact age', () => {
    const allErrors = deepValidate(fromJS({
      ...validValues,

      contact: {
        name: 'Joe',
        age: 'abc',
      },
    }));

    const contactErrors = allErrors.contact;

    expect(Object.keys(contactErrors).length).toBe(1);
    expect(typeof contactErrors.age).toBe('string');
    expect(contactErrors.age.length > 1).toBe(true);

    expect(omit(allErrors, 'contact')).toEqual(omit(validResult, 'contact'));
  });

  it('returns non empty object with error message for missing contact name', () => {
    const allErrors = deepValidate(fromJS({
      ...validValues,
      contact: {},
      otherContact: {},
    }));

    const contactErrors = allErrors.contact;

    expect(Object.keys(contactErrors).length).toBe(1);
    expect(typeof contactErrors.name).toBe('string');
    expect(contactErrors.name.length > 1).toBe(true);

    expect(omit(allErrors, 'contact')).toEqual(omit(validResult, 'contact'));
  });

  it('returns non empty object with error message for invalid contact name', () => {
    const allErrors = deepValidate(fromJS({
      ...validValues,
      contact: { name: '123' },
      otherContact: { name: '123' },
    }));

    const contactErrors = allErrors.contact;

    expect(Object.keys(contactErrors).length).toBe(1);
    expect(typeof contactErrors.name).toBe('string');
    expect(contactErrors.name.length > 1).toBe(true);

    expect(omit(allErrors, 'contact')).toEqual(omit(validResult, 'contact'));
  });

  it('returns non empty object with error messages for invalid contact fields', () => {
    const allErrors = deepValidate(fromJS({
      ...validValues,

      contact: {
        name: '1234',
        age: 'abc',
      },

      otherContact: {
        name: '1234',
      },
    }));

    const contactErrors = allErrors.contact;

    expect(Object.keys(contactErrors).length).toBe(2);

    expect(typeof contactErrors.name).toBe('string');
    expect(typeof contactErrors.age).toBe('string');

    expect(contactErrors.name.length > 1).toBe(true);
    expect(contactErrors.age.length > 1).toBe(true);

    expect(omit(allErrors, 'contact')).toEqual(omit(validResult, 'contact'));
  });

  it('returns non empty objects for missing/invalid car makes', () => {
    const allErrors = deepValidate(fromJS({
      ...validValues,

      cars: [
        {}, { make: 'Lexus' },
      ],
    }));

    const [carOneErrors, carTwoErrors] = allErrors.cars;

    expect(Object.keys(carOneErrors).length).toBe(1);
    expect(typeof carOneErrors.make).toBe('string');
    expect(carOneErrors.make.length > 1).toBe(true);

    expect(Object.keys(carTwoErrors).length).toBe(1);
    expect(typeof carTwoErrors.make).toBe('string');
    expect(carTwoErrors.make.length > 1).toBe(true);

    expect(omit(allErrors, 'cars')).toEqual(omit(validResult, 'cars'));
  });

  it('returns non empty objects for missing cat names', () => {
    const allErrors = deepValidate(fromJS({
      ...validValues,

      deeply: {
        nested: [
          {
            list: {
              cats: [
                {}, { name: '' },
              ],
            },
          },
        ],
      },
    }));

    const [catOneErrors, catTwoErrors] = allErrors.deeply.nested[0].list.cats;

    expect(Object.keys(catOneErrors).length).toBe(1);
    expect(typeof catOneErrors.name).toBe('string');
    expect(catOneErrors.name.length > 1).toBe(true);

    expect(Object.keys(catTwoErrors).length).toBe(1);
    expect(typeof catTwoErrors.name).toBe('string');
    expect(catTwoErrors.name.length > 1).toBe(true);

    expect(omit(allErrors, 'deeply')).toEqual(omit(validResult, 'deeply'));
  });

  it('validates array of values', () => {
    const allErrors = deepValidate(fromJS({
      ...validValues,
      phones: ['123', 'abc'],
    }));

    const [phoneOneError, phoneTwoError] = allErrors.phones;

    expect(phoneOneError).toBe(undefined);

    expect(typeof phoneTwoError).toBe('string');
    expect(phoneTwoError.length > 1).toBe(true);
  });

  it('validates otherContact name not matching contact name', () => {
    const allErrors = deepValidate(fromJS({
      ...validValues,
      contact: { name: 'Joe' },
      otherContact: { name: 'John' },
    }));

    const otherContactErrors = allErrors.otherContact;

    expect(Object.keys(otherContactErrors).length).toBe(1);
    expect(typeof otherContactErrors.name).toBe('string');
    expect(otherContactErrors.name.length > 1).toBe(true);

    expect(omit(allErrors, 'otherContact')).toEqual(omit(validResult, 'otherContact'));
  });

  it('handles validating empty object', () => {
    const allErrors = deepValidate(fromJS({}));

    const {
      contact: contactErrors,
      cars: carErrors,
      deeply: deeplyErrors,
    } = allErrors;

    expect(Object.keys(allErrors).length).toBe(5);
    expect(isPlainObject(allErrors.contact)).toBe(true);
    expect(Array.isArray(allErrors.cars)).toBe(true);
    expect(isPlainObject(allErrors.deeply)).toBe(true);

    expect(Object.keys(contactErrors).length).toBe(1);

    expect(carErrors).toEqual([]);

    expect(deeplyErrors).toEqual({ nested: [] });
  });

  it('handles validating missing values', () => {
    const allErrors = deepValidate();

    const {
      contact: contactErrors,
      cars: carErrors,
      deeply: deeplyErrors,
    } = allErrors;

    expect(Object.keys(allErrors).length).toBe(5);
    expect(isPlainObject(allErrors.contact)).toBe(true);
    expect(Array.isArray(allErrors.cars)).toBe(true);
    expect(isPlainObject(allErrors.deeply)).toBe(true);

    expect(Object.keys(contactErrors).length).toBe(1);

    expect(carErrors).toEqual([]);

    expect(deeplyErrors).toEqual({ nested: [] });
  });
});
