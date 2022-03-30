export function getUniqueArrayValues<T>(array: T[]): T[] {
  return array.reduce((unique, item) => (unique.includes(item) ? unique : [...unique, item]), [] as T[]);
}
