import { Controller as StimulusController } from '@hotwired/stimulus';
import { CLASSES_PROPERTY_SUFFIX } from '../constants/property-suffixes';
import { addClass } from '../utilities/add-class';

export function Classes<T extends StimulusController>(controller: T, propertyKey: string) {
  if (!propertyKey.endsWith(CLASSES_PROPERTY_SUFFIX)) {
    throw new Error(`"${propertyKey}" must end with "${CLASSES_PROPERTY_SUFFIX}"`);
  }

  addClass(controller, propertyKey.slice(0, -CLASSES_PROPERTY_SUFFIX.length));
}
