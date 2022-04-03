import { Controller } from '@hotwired/stimulus';
import { TypedController } from './typed-controller';
import { Class } from './class';
import { Classes } from './classes';
import { Target } from './target';
import { Targets } from './targets';
import { Value } from './value';
import { startApplication } from '../../jest.utils';

describe('@TypedController', () => {
  describe('@Class', () => {
    it('should delete `@Class` decorated properties and access Stimulus getters', async () => {
      @TypedController
      class TestController extends Controller {
        @Class firstClass!: string;
        @Class secondClass!: string;
      }

      const { test: testController } = await startApplication(
        { test: TestController },
        '<div data-controller="test" data-test-first-class="first" data-test-second-class="second"></div>',
      );

      expect(Object.prototype.hasOwnProperty.call(testController, 'firstClass')).toBe(false);
      expect(Object.prototype.hasOwnProperty.call(testController, 'secondClass')).toBe(false);
      expect(testController.firstClass).toBe('first');
      expect(testController.secondClass).toBe('second');
    });

    it('should delete `@Class` decorated properties and access Stimulus getters of parent and child controllers separately', async () => {
      @TypedController
      class ParentController extends Controller {
        @Class firstClass!: string;
      }

      @TypedController
      class ChildController extends ParentController {
        @Class secondClass!: string;
      }

      const { parent: parentController, child: childController } = await startApplication(
        { parent: ParentController, child: ChildController },
        `
          <div data-controller="parent" data-parent-first-class="first" data-parent-second-class="second"></div>
          <div data-controller="child" data-child-first-class="first" data-child-second-class="second"></div>
        `,
      );

      expect(Object.prototype.hasOwnProperty.call(parentController, 'firstClass')).toBe(false);
      expect(Object.prototype.hasOwnProperty.call(parentController, 'secondClass')).toBe(false);
      expect(parentController.firstClass).toBe('first');
      expect((parentController as ChildController).secondClass).toBeUndefined();

      expect(Object.prototype.hasOwnProperty.call(childController, 'firstClass')).toBe(false);
      expect(Object.prototype.hasOwnProperty.call(childController, 'secondClass')).toBe(false);
      expect(childController.firstClass).toBe('first');
      expect(childController.secondClass).toBe('second');
    });
  });

  describe('@Classes', () => {
    it('should delete `@Classes` decorated properties and access Stimulus getters', async () => {
      @TypedController
      class TestController extends Controller {
        @Classes firstClasses!: string[];
        @Classes secondClasses!: string[];
      }

      const { test: testController } = await startApplication(
        { test: TestController },
        '<div data-controller="test" data-test-first-class="first" data-test-second-class="second"></div>',
      );

      expect(Object.prototype.hasOwnProperty.call(testController, 'firstClasses')).toBe(false);
      expect(Object.prototype.hasOwnProperty.call(testController, 'secondClasses')).toBe(false);
      expect(testController.firstClasses).toBeInstanceOf(Array);
      expect(testController.secondClasses).toBeInstanceOf(Array);
    });

    it('should delete `@Classes` decorated properties and access Stimulus getters of parent and child controllers separately', async () => {
      @TypedController
      class ParentController extends Controller {
        @Classes firstClasses!: string[];
      }

      @TypedController
      class ChildController extends ParentController {
        @Classes secondClasses!: string[];
      }

      const { parent: parentController, child: childController } = await startApplication(
        { parent: ParentController, child: ChildController },
        `
          <div data-controller="parent" data-parent-first-class="parent-first" data-parent-second-class="parent-second"></div>
          <div data-controller="child" data-child-first-class="child-first" data-child-second-class="child-second"></div>
        `,
      );

      expect(Object.prototype.hasOwnProperty.call(parentController, 'firstTarget')).toBe(false);
      expect(Object.prototype.hasOwnProperty.call(parentController, 'secondTarget')).toBe(false);
      expect(parentController.firstClasses).toStrictEqual(['parent-first']);
      expect((parentController as ChildController).secondClasses).toBeUndefined();

      expect(Object.prototype.hasOwnProperty.call(childController, 'firstTarget')).toBe(false);
      expect(Object.prototype.hasOwnProperty.call(childController, 'secondTarget')).toBe(false);
      expect(childController.firstClasses).toStrictEqual(['child-first']);
      expect(childController.secondClasses).toStrictEqual(['child-second']);
    });
  });

  describe('@Target', () => {
    it('should delete `@Target` decorated properties and access Stimulus getters', async () => {
      @TypedController
      class TestController extends Controller {
        @Target firstTarget!: HTMLElement;
        @Target secondTarget!: HTMLElement;
      }

      const { test: testController } = await startApplication(
        { test: TestController },
        `
          <div data-controller="test">
            <div data-test-target="first"></div>
            <div data-test-target="second"></div>
          </div>
        `,
      );

      expect(Object.prototype.hasOwnProperty.call(testController, 'firstTarget')).toBe(false);
      expect(Object.prototype.hasOwnProperty.call(testController, 'secondTarget')).toBe(false);
      expect(testController.firstTarget).toBeInstanceOf(Element);
      expect(testController.secondTarget).toBeInstanceOf(Element);
    });

    it('should delete `@Target` decorated properties and access Stimulus getters of parent and child controllers separately', async () => {
      @TypedController
      class ParentController extends Controller {
        @Target firstTarget!: HTMLElement;
      }

      @TypedController
      class ChildController extends ParentController {
        @Target secondTarget!: HTMLElement;
      }

      const { parent: parentController, child: childController } = await startApplication(
        { parent: ParentController, child: ChildController },
        `
          <div data-controller="parent">
            <div data-parent-target="first"></div>
            <div data-parent-target="second"></div>
          </div>
          <div data-controller="child">
            <div data-child-target="first"></div>
            <div data-child-target="second"></div>
          </div>
        `,
      );

      expect(Object.prototype.hasOwnProperty.call(parentController, 'firstTarget')).toBe(false);
      expect(Object.prototype.hasOwnProperty.call(parentController, 'secondTarget')).toBe(false);
      expect(parentController.firstTarget).toBeInstanceOf(Element);
      expect((parentController as ChildController).secondTarget).toBeUndefined();

      expect(Object.prototype.hasOwnProperty.call(childController, 'firstTarget')).toBe(false);
      expect(Object.prototype.hasOwnProperty.call(childController, 'secondTarget')).toBe(false);
      expect(childController.firstTarget).toBeInstanceOf(Element);
      expect(childController.secondTarget).toBeInstanceOf(Element);
    });
  });

  describe('@Targets', () => {
    it('should delete `@Targets` decorated properties and access Stimulus getters', async () => {
      @TypedController
      class TestController extends Controller {
        @Targets firstTargets!: HTMLElement[];
        @Targets secondTargets!: HTMLElement[];
      }

      const { test: testController } = await startApplication(
        { test: TestController },
        `
          <div data-controller="test">
            <div data-test-target="first"></div>
            <div data-test-target="second"></div>
          </div>
        `,
      );

      expect(Object.prototype.hasOwnProperty.call(testController, 'firstTargets')).toBe(false);
      expect(Object.prototype.hasOwnProperty.call(testController, 'secondTargets')).toBe(false);
      expect(testController.firstTargets).toBeInstanceOf(Array);
      expect(testController.secondTargets).toBeInstanceOf(Array);
    });

    it('should delete `@Targets` decorated properties and access Stimulus getters of parent and child controllers separately', async () => {
      @TypedController
      class ParentController extends Controller {
        @Targets firstTargets!: HTMLElement[];
      }

      @TypedController
      class ChildController extends ParentController {
        @Targets secondTargets!: HTMLElement[];
      }

      const { parent: parentController, child: childController } = await startApplication(
        { parent: ParentController, child: ChildController },
        `
          <div data-controller="parent">
            <div data-parent-target="first"></div>
            <div data-parent-target="second"></div>
          </div>
          <div data-controller="child">
            <div data-child-target="first"></div>
            <div data-child-target="second"></div>
          </div>
        `,
      );

      expect(Object.prototype.hasOwnProperty.call(parentController, 'firstTargets')).toBe(false);
      expect(Object.prototype.hasOwnProperty.call(parentController, 'secondTargets')).toBe(false);
      expect(parentController.firstTargets).toBeInstanceOf(Array);
      expect((parentController as ChildController).secondTargets).toBeUndefined();

      expect(Object.prototype.hasOwnProperty.call(childController, 'firstTargets')).toBe(false);
      expect(Object.prototype.hasOwnProperty.call(childController, 'secondTargets')).toBe(false);
      expect(childController.firstTargets).toBeInstanceOf(Array);
      expect(childController.secondTargets).toBeInstanceOf(Array);
    });
  });

  describe('@Value', () => {
    it('should delete `@Value` decorated properties and access Stimulus getters', async () => {
      @TypedController
      class TestController extends Controller {
        @Value firstValue!: string;
        @Value secondValue!: number;
      }

      const { test: testController } = await startApplication(
        { test: TestController },
        '<div data-controller="test"></div>',
      );

      expect(Object.prototype.hasOwnProperty.call(testController, 'firstValue')).toBe(false);
      expect(Object.prototype.hasOwnProperty.call(testController, 'secondValue')).toBe(false);
      expect(testController.firstValue).toBeDefined();
      expect(testController.secondValue).toBeDefined();
    });

    it('should delete `@Value` decorated properties, assign default values and access Stimulus getters when values are assigned', async () => {
      @TypedController
      class TestController extends Controller {
        @Value firstValue: string = 'value';
        @Value secondValue: number = 5;
      }

      const { test: testController } = await startApplication(
        { test: TestController },
        `
        <div data-controller="test"></div>
      `,
      );

      expect(Object.prototype.hasOwnProperty.call(testController, 'firstValue')).toBe(false);
      expect(Object.prototype.hasOwnProperty.call(testController, 'secondValue')).toBe(false);
      expect(testController.firstValue).toBe('value');
      expect(testController.secondValue).toBe(5);
    });

    it('should delete `@Value` decorated properties, assign default values and access Stimulus getters when values are assigned of parent and child controllers separately', async () => {
      @TypedController
      class ParentController extends Controller {
        @Value firstValue: string = 'value';
      }

      @TypedController
      class ChildController extends ParentController {
        @Value secondValue: number = 5;
      }

      const { parent: parentController, child: childController } = await startApplication(
        { parent: ParentController, child: ChildController },
        `
        <div data-controller="parent"></div>
        <div data-controller="child"></div>
      `,
      );

      expect(Object.prototype.hasOwnProperty.call(parentController, 'firstValue')).toBe(false);
      expect(Object.prototype.hasOwnProperty.call(parentController, 'secondValue')).toBe(false);
      expect(parentController.firstValue).toBe('value');
      expect((parentController as ChildController).secondValue).toBeUndefined();

      expect(Object.prototype.hasOwnProperty.call(childController, 'firstValue')).toBe(false);
      expect(Object.prototype.hasOwnProperty.call(childController, 'secondValue')).toBe(false);
      expect(childController.firstValue).toBe('value');
      expect(childController.secondValue).toBe(5);
    });
  });
});
