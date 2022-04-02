import { Controller } from '@hotwired/stimulus';
import { Target } from './target';
import { startApplication } from '../../jest.utils';

describe('@Target', () => {
  it('should add `@Target` decorated properties to `static targets` array of a controller', async () => {
    class TestController extends Controller {
      @Target firstTarget!: HTMLElement;
      @Target secondTarget!: HTMLElement;
    }

    const { test: testController } = await startApplication(
      { test: TestController },
      '<div data-controller="test"></div>',
    );

    expect((testController.constructor as typeof TestController).targets).toStrictEqual(['first', 'second']);
  });

  it('should add `@Target` decorated properties to `static targets` arrays of parent and child controllers separately', async () => {
    class ParentController extends Controller {
      @Target firstTarget!: HTMLElement;
    }

    class ChildController extends ParentController {
      @Target secondTarget!: HTMLElement;
    }

    const { parent: parentController, child: childController } = await startApplication(
      { parent: ParentController, child: ChildController },
      `
        <div data-controller="parent"></div>
        <div data-controller="child"></div>
      `,
    );

    expect((parentController.constructor as typeof ParentController).targets).toStrictEqual(['first']);
    expect((childController.constructor as typeof ChildController).targets).toStrictEqual(['second']);
  });

  it("should throw an error when `@Target` decorated property doesn't end with `Target`", async () => {
    class TestController extends Controller {}

    const { test: testController } = await startApplication(
      { test: TestController },
      '<div data-controller="test"></div>',
    );

    expect(() => Target(testController, 'firstTargettt')).toThrow('"firstTargettt" must end with "Target"');
  });
});
