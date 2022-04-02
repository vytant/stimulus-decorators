import { readInheritableStaticArrayValues, readInheritableStaticObjectKeys } from './inheritable-statics';

describe('readInheritableStaticArrayValues', () => {
  it('should return an array with unique array values of inherited static property', () => {
    class Parent {
      static array = [1, 2, 3];
    }

    class Child extends Parent {
      static array = [2, 3, 4];
    }

    expect(readInheritableStaticArrayValues(Child, 'array')).toStrictEqual([1, 2, 3, 4]);
  });
});

describe('readInheritableStaticObjectKeys', () => {
  it('should return an array with unique property keys of inherited static property', () => {
    class Parent {
      static object: Record<string, unknown> = { prop1: 1, prop2: 2, prop3: 3 };
    }

    class Child extends Parent {
      static object: Record<string, unknown> = { prop2: 2, prop3: 3, prop4: 4 };
    }

    expect(readInheritableStaticObjectKeys(Child, 'object')).toStrictEqual(['prop1', 'prop2', 'prop3', 'prop4']);
  });
});
