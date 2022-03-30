import { Controller as StimulusController } from '@hotwired/stimulus';
import { TARGET_PROPERTY_SUFFIX } from '../constants/property-suffixes';
import { addTarget } from '../utilities/add-target';

export function Target<T extends StimulusController>(controller: T, propertyKey: string) {
  if (!propertyKey.endsWith(TARGET_PROPERTY_SUFFIX)) {
    throw new Error(`"${propertyKey}" must end with "${TARGET_PROPERTY_SUFFIX}"`);
  }

  addTarget(controller, propertyKey.slice(0, -TARGET_PROPERTY_SUFFIX.length));
}
