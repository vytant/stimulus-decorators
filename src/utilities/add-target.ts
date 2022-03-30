import { Controller as StimulusController } from '@hotwired/stimulus';

export function addTarget<T extends StimulusController>(controller: T, targetKey: string) {
  const constructor = controller.constructor as typeof StimulusController;

  if (!Object.prototype.hasOwnProperty.call(constructor, 'targets')) {
    constructor.targets = [];
  }

  if (!constructor.targets.includes(targetKey)) {
    constructor.targets.push(targetKey);
  }
}
