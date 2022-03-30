import { Controller as StimulusController } from '@hotwired/stimulus';
import { VALUE_PROPERTY_SUFFIX } from '../constants/property-suffixes';
import { ValueType } from '../types/value-type';
import { addValue } from '../utilities/add-value';

export function Value(type: ValueType) {
  return <T extends StimulusController>(controller: T, propertyKey: string) => {
    if (!propertyKey.endsWith(VALUE_PROPERTY_SUFFIX)) {
      throw new Error(`"${propertyKey}" must end with "${VALUE_PROPERTY_SUFFIX}"`);
    }

    addValue(controller, propertyKey.slice(0, -VALUE_PROPERTY_SUFFIX.length), type);
  };
}
