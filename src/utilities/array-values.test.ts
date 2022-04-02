import { getUniqueArrayValues } from './array-values';

describe('getUniqueArrayValues', () => {
  it('should return an array with unique values when array with duplicated values is provided', () => {
    expect(
      getUniqueArrayValues([undefined, 'a', 'a', null, 0, true, 'a', null, 'b', 0, false, true, 'c', 1]),
    ).toStrictEqual([undefined, 'a', null, 0, true, 'b', false, 'c', 1]);
  });

  it('should return an empty array when an empty array is provided', () => {
    expect(getUniqueArrayValues([])).toStrictEqual([]);
  });
});
