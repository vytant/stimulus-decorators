import { deleteOwnProperty } from './object-properties';

describe('deleteOwnProperties', () => {
  it('should delete object property when an owned property key is provided', () => {
    const testObject = {
      prop1: 'value1',
      prop2: 'value2',
    };

    deleteOwnProperty(testObject, 'prop1');

    expect(testObject).toEqual({
      prop2: 'value2',
    });
  });

  it('should not delete object property when not owned property key is provided', () => {
    const testObject = {
      prop1: 'value1',
    };

    deleteOwnProperty(testObject, 'prop2');

    expect(testObject).toEqual({
      prop1: 'value1',
    });
  });
});
