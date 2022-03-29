import { Controller as StimulusController } from '@hotwired/stimulus';
import { Constructor } from '../types/contructor';
import { readInheritableStaticArrayValues } from '../utilities/inheritable-statics';
import { deleteOwnProperty } from '../utilities/object';
import { TARGET_PROPERTY_SUFFIX, TARGETS_PROPERTY_SUFFIX } from '../constants/property-suffixes';

export function TypedController<T extends Constructor<StimulusController>>(BaseController: T) {
  return class extends BaseController {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      super(...args);

      const constructor = this.constructor as typeof StimulusController;

      // Deletes defined values to access getters defined by Stimulus blessings
      readInheritableStaticArrayValues(constructor, 'targets').forEach(name => {
        deleteOwnProperty(this, `${name}${TARGET_PROPERTY_SUFFIX}`);
        deleteOwnProperty(this, `${name}${TARGETS_PROPERTY_SUFFIX}`);
      });
    }
  };
}
