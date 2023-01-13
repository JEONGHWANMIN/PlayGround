/**
 * Awaited<T>
 *
 */

async function Foo() {
  return Promise.resolve("Hello");
}

function Bar(): Promise<string> {
  const text = Foo();
  return text;
}

Foo().then((r) => console.log(r));

export {};
