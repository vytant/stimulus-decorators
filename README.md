# Stimulus Decorators

Stimulus Decorators is a TypeScript library that extends the [Stimulus](https://stimulus.hotwired.dev/) framework with TypeScript decorators to give you improved IntelliSense and type safety of automatically generated Stimulus controller properties.

## Prerequisites

- Stimulus 3
- TypeScript

## Usage

There are several decorators:

- [`@Target`](#target_decorator)
- [`@Targets`](#targets_decorator)
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

### <a name="typed_controller_decorator"></a> `@TypedController` decorator

It is required to use the `@TypedController` decorator on every Stimulus controller where you use `@Target`, or `@Targets` decorators.

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
