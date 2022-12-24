function Foo() {
  console.log(this);
}

Foo(); // logs global object

const bar = new Foo(); // logs Foo object

bar(); // TypeError: bar is not a function
