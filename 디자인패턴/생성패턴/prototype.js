function Dog(name) {
  this.name = name;

  this.bark = () => {
    return `Woof!`;
  };
}

const dog1 = new Dog("환고");
const dog2 = new Dog("환고");
const dog3 = new Dog("환고");

console.log(dog1.bark());

function Cat(name) {
  this.name = name;
}

Cat.prototype.bark = () => `mewmew!`;

const cat1 = new Cat("얀고");
const cat2 = new Cat("얀고");
const cat3 = new Cat("얀고");

console.log(cat1.bark());

class Panda {
  constructor(name) {
    this.name = name;
  }

  bark() {
    return "papap";
  }

  bark2() {
    return "papap";
  }
}

class SubPanda extends Panda {
  constructor(name) {
    super(name);
  }

  bark() {
    return "papap2";
  }
}

const panda1 = new Panda("판다1"); //__proto__
const panda2 = new Panda("판다1"); //__proto__
const panda3 = new Panda("판다1"); //__proto__

const subPanda1 = new SubPanda("서브판다"); // __proto__

console.log(subPanda1.bark2());

console.log(panda1.bark());

console.log(Panda.prototype);
console.log(panda1.__proto__);

const a = [];

Array.prototype.hwanmin = () => console.log("먕먕");

a.hwanmin();
