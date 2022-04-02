import { Controller } from '@hotwired/stimulus';
import { Targets } from './targets';
import { Target } from './target';
import { startApplication } from '../../jest.utils';

describe('@Targets', () => {
  it('should add `@Targets` decorated properties to `static targets` array of a controller', async () => {
    class TestController extends Controller {
      @Targets firstTargets!: HTMLElement[];
      @Targets secondTargets!: HTMLElement[];
    }

    const { test: testController } = await startApplication(
      { test: TestController },
      '<div data-controller="test"></div>',
    );

    expect((testController.constructor as typeof TestController).targets).toStrictEqual(['first', 'second']);
  });

  it('should add `@Targets` decorated properties to `static targets` arrays of parent and child controllers separately', async () => {
    class ParentController extends Controller {
      @Targets firstTargets!: HTMLElement;
    }

    class ChildController extends ParentController {
      @Targets secondTargets!: HTMLElement;
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

  it('should add `@Targets` and `@Target` decorated properties to `static targets` array of a controller without duplicating them', async () => {
    class TestController extends Controller {
      @Target firstTarget!: HTMLElement;
      @Target secondTarget!: HTMLElement;
      @Targets secondTargets!: HTMLElement[];
      @Targets thirdTargets!: HTMLElement[];
    }

    const { test: testController } = await startApplication(
      { test: TestController },
      '<div data-controller="test"></div>',
    );

    expect((testController.constructor as typeof TestController).targets).toStrictEqual(['first', 'second', 'third']);
  });

  it("should throw an error when `@Targets` decorated property doesn't end with `Targets`", async () => {
    class TestController extends Controller {}

    const { test: testController } = await startApplication(
      { test: TestController },
      '<div data-controller="test"></div>',
    );

    expect(() => Targets(testController, 'firstTargetsss')).toThrow('"firstTargetsss" must end with "Targets"');
  });
});
