import { Controller as StimulusController } from '@hotwired/stimulus';
import { Constructor } from '../types/contructor';
import { readInheritableStaticArrayValues, readInheritableStaticObjectKeys } from '../utilities/inheritable-statics';
import { deleteOwnProperty } from '../utilities/object-properties';
import {
  CLASS_PROPERTY_SUFFIX,
  CLASSES_PROPERTY_SUFFIX,
  TARGET_PROPERTY_SUFFIX,
  TARGETS_PROPERTY_SUFFIX,
  VALUE_PROPERTY_SUFFIX,
} from '../constants/property-suffixes';
import { capitalize } from '../utilities/capitalize';

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

      readInheritableStaticArrayValues(constructor, 'classes').forEach(name => {
        deleteOwnProperty(this, `${name}${CLASS_PROPERTY_SUFFIX}`);
        deleteOwnProperty(this, `${name}${CLASSES_PROPERTY_SUFFIX}`);
      });

      readInheritableStaticObjectKeys(constructor, 'values').forEach(key => {
        const valueKey = `${key}${VALUE_PROPERTY_SUFFIX}` as string & keyof this;

        if (Object.prototype.hasOwnProperty.call(this, valueKey)) {
          const defaultValue = this[valueKey];

          delete this[valueKey];

          // FIXME: this doesn't work when extending and overriding parent class value
          if (defaultValue !== undefined && !this[`has${capitalize(valueKey)}` as keyof this]) {
            // Sets default value only if there is no value defined in the template
            this[valueKey] = defaultValue;
          }
        }
      });
    }
  };
}
