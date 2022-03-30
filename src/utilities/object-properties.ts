export function deleteOwnProperty<T extends object>(target: T, propertyKey: string) {
  if (Object.prototype.hasOwnProperty.call(target, propertyKey)) {
    delete target[propertyKey as keyof T];
  }
}
