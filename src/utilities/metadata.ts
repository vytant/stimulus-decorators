/// <reference types='reflect-metadata'/>

export const isReflectMetadataSupported = typeof Reflect !== 'undefined' && typeof Reflect.getMetadata !== 'undefined';

export function getReflectedMetadataType(target: object, propertyKey: string) {
  return Reflect.getMetadata('design:type', target, propertyKey);
}
