import { Controller as StimulusController } from '@hotwired/stimulus';
import { VALUE_PROPERTY_SUFFIX } from '../constants/property-suffixes';
import { ValueType } from '../types/value-type';
import { addValue } from '../utilities/add-value';
import { getReflectedMetadataType, isReflectMetadataSupported } from '../utilities/metadata';

export function Value(type: ValueType): <T extends StimulusController>(controller: T, propertyKey: string) => void;
export function Value<T extends StimulusController>(controller: T, propertyKey: string): void;
export function Value<T extends StimulusController>(...args: unknown[]): unknown {
  if (args[1] === undefined) {
    return <T extends StimulusController>(controller: T, propertyKey: string) => {
      if (!propertyKey.endsWith(VALUE_PROPERTY_SUFFIX)) {
        throw new Error(`"${propertyKey}" must end with "${VALUE_PROPERTY_SUFFIX}"`);
      }

      const type = args[0] as ValueType;

      addValue(controller, propertyKey.slice(0, -VALUE_PROPERTY_SUFFIX.length), type);
    };
  }

  const controller = args[0] as T;
  const propertyKey = args[1] as string;

  if (!isReflectMetadataSupported) {
    throw new Error(`Unknown "${propertyKey}" type, check if the "reflect-metadata" is configured correctly`);
  }

  return Value(getReflectedMetadataType(controller, propertyKey))(controller, propertyKey);
}
