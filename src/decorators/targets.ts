import { Controller as StimulusController } from '@hotwired/stimulus';
import { TARGETS_PROPERTY_SUFFIX } from '../constants/property-suffixes';
import { addTarget } from '../utilities/add-target';

export function Targets<T extends StimulusController>(controller: T, propertyKey: string) {
  if (!propertyKey.endsWith(TARGETS_PROPERTY_SUFFIX)) {
    throw new Error(`"${propertyKey}" must end with "${TARGETS_PROPERTY_SUFFIX}"`);
  }

  addTarget(controller, propertyKey.slice(0, -TARGETS_PROPERTY_SUFFIX.length));
}
