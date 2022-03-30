import { Controller as StimulusController } from '@hotwired/stimulus';
import { ValueType } from '../types/value-type';

export function addValue<T extends StimulusController>(controller: T, valueKey: string, valueType: ValueType) {
  const constructor = controller.constructor as typeof StimulusController;

  if (!Object.prototype.hasOwnProperty.call(constructor, 'values')) {
    constructor.values = {};
  }

  constructor.values[valueKey] = valueType;
}
