# Stimulus Decorators

Stimulus Decorators is a TypeScript library that extends the [Stimulus](https://stimulus.hotwired.dev/) framework with TypeScript decorators to give you improved IntelliSense and type safety of automatically generated Stimulus controller properties.

## Prerequisites

- Stimulus 3
- TypeScript

## Installation

If you use Yarn package manager.

```bash
yarn add @vytant/stimulus-decorators
```

If you use npm package manager.

```bash
npm install --save @vytant/stimulus-decorators
```

## Usage

There are several decorators:

- [`@Target`](#target_decorator)
- [`@Targets`](#targets_decorator)
- [`@Value`](#value_decorator)
- [`@TypedController`](#typed_controller_decorator)

### <a name="target_decorator"></a> `@Target` decorator

Explicitly define target properties with types using the `@Target` decorator, and it will automatically add them to the `static targets` array for your Stimulus controller.

```ts
// hello_controller.ts
import { Controller } from '@hotwired/stimulus';
import { Target, TypedController } from '@vytant/stimulus-decorators';

@TypedController
export default class extends Controller {
  @Target outputTarget!: HTMLElement;
  @Target nameTarget!: HTMLInputElement;

  greet() {
    this.outputTarget.textContent = `Hello, ${this.nameTarget.value}!`;
  }
}
```

Equivalent to:

```js
// hello_controller.js
import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['name', 'output'];

  greet() {
    this.outputTarget.textContent = `Hello, ${this.nameTarget.value}!`;
  }
}
```

### <a name="targets_decorator"></a> `@Targets` decorator

To get an array of all matching targets in scope, use the `@Targets` decorator.

```ts
// slider_controller.ts
import { Controller } from '@hotwired/stimulus';
import { Targets, TypedController } from '@vytant/stimulus-decorators';

@TypedController
export default class extends Controller {
  @Targets slideTargets!: HTMLElement[];

  connect() {
    this.slideTargets.forEach((element, index) => {
      /* … */
    });
  }
}
```

Equivalent to:

```js
// slider_controller.js
import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['slide'];

  connect() {
    this.slideTargets.forEach((element, index) => {
      /* … */
    });
  }
}
```

### <a name="value_decorator"></a> `@Value` decorator

Explicitly define value properties with types and default values using the `@Value` decorator, and it will automatically add them to the `static values` object for your Stimulus controller.

```ts
// loader_controller.ts
import { Controller } from '@hotwired/stimulus';
import { Value, TypedController } from '@vytant/stimulus-decorators';

@TypedController
export default class extends Controller {
  @Value(String) urlValue!: string;
  @Value(String) methodValue: string = 'GET';

  connect() {
    fetch(this.urlValue, { method: this.methodValue }).then(/* … */);
  }
}
```

Equivalent to:

```js
// loader_controller.js
import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static values = {
    url: String,
    method: { type: String, default: 'GET' },
  };

  connect() {
    fetch(this.urlValue, { method: this.methodValue }).then(/* … */);
  }
}
```

#### If you'd like to set the `type` of each value from its type definition, you must use [reflect-metadata](https://github.com/rbuckton/reflect-metadata).

1. Set `"emitDecoratorMetadata": true` in your `tsconfig.json`.
2. Import `reflect-metadata` **before** importing `@vytant/stimulus-decorators` (importing `reflect-metadata` is needed just once).

```ts
// loader_controller.ts
import 'reflect-metadata';
import { Controller } from '@hotwired/stimulus'
import { Value, TypedController } from '@vytant/stimulus-decorators';

@TypedController
export default class extends Controller {
   @Value urlValue!: string;
   @Value methodValue: string = 'GET';

   connect() {
      fetch(this.urlValue, { method: this.methodValue }).then(/* … */);
   }
}
```

### <a name="typed_controller_decorator"></a> `@TypedController` decorator

It is required to use the `@TypedController` decorator on every Stimulus controller where you use `@Target`, `@Targets`, or `@Value` decorators.

```ts
// controller.ts
import { Controller } from '@hotwired/stimulus';
import { TypedController } from '@vytant/stimulus-decorators';

@TypedController
export default class extends Controller {
  /* … */
}
```

## License

The project is [MIT](https://choosealicense.com/licenses/mit/) licensed.
