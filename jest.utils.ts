import { Application, Controller } from '@hotwired/stimulus';

export async function startApplication<
  T extends Controller,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  M extends { [identifier: string]: new (...args: any[]) => T },
>(controllers: M, template: string) {
  document.body.innerHTML = template;

  const application = Application.start();

  Object.entries(controllers).forEach(([identifier, controller]) => {
    application.register(identifier, controller);
  });

  await new Promise(resolve => requestAnimationFrame(resolve));

  return Object.keys(controllers).reduce(
    (instances, identifier) => ({
      ...instances,
      [identifier]: application.getControllerForElementAndIdentifier(
        document.querySelector(`[data-controller="${identifier}"]`)!,
        identifier,
      ),
    }),
    {},
  ) as { [K in keyof M]: InstanceType<M[K]> };
}
