const log = console.log;

const person = {
  name: "John Doe",
  age: 42,
  nationality: "American",
};

const personProxy = new Proxy(person, {
  get: (obj, prop: keyof typeof person) => {
    console.log(`The value of ${prop} is ${obj[prop]}`);
  },
  set: (obj, prop: keyof typeof person, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    if (prop === "age" && typeof value === "number") {
      obj[prop] = value;
    }
    return true;
  },
});

personProxy.age = 20;

log(personProxy.age);

const personReflectProxy = new Proxy(person, {
  get: (obj, prop: keyof typeof person) => {
    console.log(`The value of ${prop} is ${Reflect.get(obj, prop)}`);
  },
  set: (obj, prop: keyof typeof person, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    Reflect.set(obj, prop, value);
    return true;
  },
});

personReflectProxy.age = 50;
console.log(personReflectProxy.age);

export {};
