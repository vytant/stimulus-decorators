import { Controller } from '@hotwired/stimulus';
import { Classes } from './classes';
import { Class } from './class';
import { startApplication } from '../../jest.utils';

describe('@Classes', () => {
  it('should add `@Classes` decorated properties to `static classes` array of a controller', async () => {
    class TestController extends Controller {
      @Classes firstClasses!: string[];
      @Classes secondClasses!: string[];
    }

    const { test: testController } = await startApplication(
      { test: TestController },
      '<div data-controller="test"></div>',
    );

    expect((testController.constructor as typeof TestController & { classes: string[] }).classes).toStrictEqual([
      'first',
      'second',
    ]);
  });

  it('should add `@Classes` decorated properties to `static classes` arrays of parent and child controllers separately', async () => {
    class ParentController extends Controller {
      @Classes firstClasses!: string;
    }

    class ChildController extends ParentController {
      @Classes secondClasses!: string;
    }

    const { parent: parentController, child: childController } = await startApplication(
      { parent: ParentController, child: ChildController },
      `
        <div data-controller="parent"></div>
        <div data-controller="child"></div>
      `,
    );

    expect((parentController.constructor as typeof ParentController & { classes: string[] }).classes).toStrictEqual([
      'first',
    ]);
    expect((childController.constructor as typeof ChildController & { classes: string[] }).classes).toStrictEqual([
      'second',
    ]);
  });

  it('should add `@Classes` and `@Class` decorated properties to `static classes` array of a controller without duplicating them', async () => {
    class TestController extends Controller {
      @Class firstClass!: string;
      @Class secondClass!: string;
      @Classes secondClasses!: string[];
      @Classes thirdClasses!: string[];
    }

    const { test: testController } = await startApplication(
      { test: TestController },
      '<div data-controller="test"></div>',
    );

    expect((testController.constructor as typeof TestController & { classes: string[] }).classes).toStrictEqual([
      'first',
      'second',
      'third',
    ]);
  });

  it("should throw an error when `@Classes` decorated property doesn't end with `Classes`", async () => {
    class TestController extends Controller {}

    const { test: testController } = await startApplication(
      { test: TestController },
      '<div data-controller="test"></div>',
    );

    expect(() => Classes(testController, 'firstClassesss')).toThrow('"firstClassesss" must end with "Classes"');
  });
});
