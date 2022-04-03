import { Controller } from '@hotwired/stimulus';
import { Class } from './class';
import { startApplication } from '../../jest.utils';

describe('@Class', () => {
  it('should add `@Class` decorated properties to `static classes` array of a controller', async () => {
    class TestController extends Controller {
      @Class firstClass!: string;
      @Class secondClass!: string;
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

  it('should add `@Class` decorated properties to `static classes` arrays of parent and child controllers separately', async () => {
    class ParentController extends Controller {
      @Class firstClass!: string;
    }

    class ChildController extends ParentController {
      @Class secondClass!: string;
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

  it("should throw an error when `@Class` decorated property doesn't end with `Class`", async () => {
    class TestController extends Controller {}

    const { test: testController } = await startApplication(
      { test: TestController },
      '<div data-controller="test"></div>',
    );

    expect(() => Class(testController, 'firstClassss')).toThrow('"firstClassss" must end with "Class"');
  });
});
