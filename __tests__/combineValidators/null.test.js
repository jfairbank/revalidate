// @flow
import { combineValidators } from '../../src';
import { validatePersonDefinition } from './_helpers';

const validatePerson = combineValidators(validatePersonDefinition, {
  nullWhenValid: true,
});

describe('with nullWhenValid option', () => {
  it('returns null for valid fields', () => {
    const result = validatePerson({
      name: 'Joe',
      confirmName: 'Joe',
      age: '29',
      job: 'Developer',
    });

    expect(result).toBe(null);
  });

  it('returns null if job is not required', () => {
    const result = validatePerson({
      name: 'Joe',
      confirmName: 'Joe',
      age: '17',
    });

    expect(result).toBe(null);
  });
});
