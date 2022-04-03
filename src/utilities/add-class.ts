import { Controller as StimulusController } from '@hotwired/stimulus';

export function addClass<T extends StimulusController>(controller: T, targetKey: string) {
  const constructor = controller.constructor as typeof StimulusController & { classes: string[] };

  if (!Object.prototype.hasOwnProperty.call(constructor, 'classes')) {
    constructor.classes = [];
  }

  if (!constructor.classes.includes(targetKey)) {
    constructor.classes.push(targetKey);
  }
}
