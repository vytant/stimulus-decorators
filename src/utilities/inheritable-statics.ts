import { Constructor } from '../types/contructor';
import { getUniqueArrayValues } from './array';

export function readInheritableStaticArrayValues<T>(constructor: Constructor<T>, propertyKey: string) {
  const ancestors = getAncestorsForConstructor(constructor);

  return getUniqueArrayValues(
    ancestors.reduce((values, constructor) => {
      values.push(...getOwnStaticArrayValues(constructor, propertyKey));

      return values;
    }, [] as string[]),
  );
}

function getAncestorsForConstructor<T>(constructor: Constructor<T>) {
  const ancestors: Constructor<unknown>[] = [];

  while (constructor) {
    ancestors.push(constructor);
    constructor = Object.getPrototypeOf(constructor);
  }

  return ancestors.reverse();
}

function getOwnStaticArrayValues<T>(constructor: Constructor<T>, propertyKey: string) {
  const definition = constructor[propertyKey as keyof typeof constructor];

  return Array.isArray(definition) ? definition : [];
}
