import { Controller } from '@hotwired/stimulus';
import { Value } from './value';
import { startApplication } from '../../jest.utils';

jest.mock('../utilities/metadata', () => ({
  __esModule: true,
  ...jest.requireActual('../utilities/metadata'),
  isReflectMetadataSupported: true,
}));

describe('@Value', () => {
  it('should add `@Value` decorated properties with types to `static values` object of a controller when types are provided', async () => {
    class TestController extends Controller {
      @Value(String) firstValue!: unknown;
      @Value(Number) secondValue!: unknown;
    }

    const { test: testController } = await startApplication(
      { test: TestController },
      '<div data-controller="test"></div>',
    );

    expect((testController.constructor as typeof TestController).values).toStrictEqual({
      first: String,
      second: Number,
    });
  });

  it('should add `@Value` decorated properties with types from `reflect-metadata` to `static values` object of a controller when types are not provided', async () => {
    jest.requireMock('../utilities/metadata').isReflectMetadataSupported = true;

    class TestController extends Controller {
      @Value firstValue!: string;
      @Value secondValue!: number;
    }

    const { test: testController } = await startApplication(
      { test: TestController },
      '<div data-controller="test"></div>',
    );

    expect((testController.constructor as typeof TestController).values).toStrictEqual({
      first: String,
      second: Number,
    });
  });

  it("should throw an error when `@Value` decorated property doesn't end with `Value`", async () => {
    class TestController extends Controller {}

    const { test: testController } = await startApplication(
      { test: TestController },
      '<div data-controller="test"></div>',
    );

    expect(() => Value(testController, 'firstValueee')).toThrow('"firstValueee" must end with "Value"');
  });

  it("should throw an error when type is not passed to `@Value` decorated property and `reflect-metadata` isn't supported", async () => {
    jest.requireMock('../utilities/metadata').isReflectMetadataSupported = false;

    class TestController extends Controller {}

    const { test: testController } = await startApplication(
      { test: TestController },
      '<div data-controller="test"></div>',
    );

    expect(() => Value(testController, 'firstValue')).toThrow(
      'Unknown "firstValue" type, check if the "reflect-metadata" is configured correctly',
    );
  });

  it('should add `@Value` decorated properties to `static values` object of parent and child controllers separately', async () => {
    jest.requireMock('../utilities/metadata').isReflectMetadataSupported = true;

    class ParentController extends Controller {
      @Value(String) firstValue!: string;
      @Value secondValue!: number;
    }

    class ChildController extends ParentController {
      @Value(Boolean) thirdValue!: boolean;
      @Value fourthValue!: string[];
    }

    const { parent: parentController, child: childController } = await startApplication(
      { parent: ParentController, child: ChildController },
      `
        <div data-controller="parent"></div>
        <div data-controller="child"></div>
      `,
    );

    expect((parentController.constructor as typeof ParentController).values).toStrictEqual({
      first: String,
      second: Number,
    });

    expect((childController.constructor as typeof ChildController).values).toStrictEqual({
      third: Boolean,
      fourth: Array,
    });
  });

  afterAll(() => {
    jest.unmock('../utilities/metadata');
  });
});
