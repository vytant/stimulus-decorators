import { Controller as StimulusController } from '@hotwired/stimulus';
import { CLASS_PROPERTY_SUFFIX } from '../constants/property-suffixes';
import { addClass } from '../utilities/add-class';

export function Class<T extends StimulusController>(controller: T, propertyKey: string) {
  if (!propertyKey.endsWith(CLASS_PROPERTY_SUFFIX)) {
    throw new Error(`"${propertyKey}" must end with "${CLASS_PROPERTY_SUFFIX}"`);
  }

  addClass(controller, propertyKey.slice(0, -CLASS_PROPERTY_SUFFIX.length));
}
