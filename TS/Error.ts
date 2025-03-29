const reportError = ({ message }) => {
  console.log(message);
};

try {
  throw new Error("this is try block");
} catch (error) {
  let message;
  if (error instanceof Error) message = error.message;
  else message = String(error);
  // we'll proceed, but let's report it
  reportError({ message });
}

export {};

function createUser({ name, age }: { name: string; age: number }) {
  return { name, age };
}
