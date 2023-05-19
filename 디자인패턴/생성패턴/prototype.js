class Dog {
  constructor(name) {
    this.name = name;
  }

  bark() {
    return `Woof!`;
  }
}

const dog1 = new Dog("Daisy");
const dog2 = new Dog("Max");
const dog3 = new Dog("Spot");

console.log(dog1.bark());
console.log(dog2.bark());
console.log(dog3.bark());

Dog.prototype.play = () => console.log("플레이 ~~");

dog1.play();
