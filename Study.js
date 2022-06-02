function Person(name) {
  this.name = name;
}

const me = new Person('Hwan');

console.log(Person.prototype === me.__proto__);
console.log(me.constructor === Person);
