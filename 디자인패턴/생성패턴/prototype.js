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

/**
 * 주의: Object.prototype.__proto__는 오늘날 대부분의 브라우저에서 지원되지만,
 * 그 존재와 정확한 동작은 오직 웹 브라우저와의 호환성을 보장하기 위한 레거시 기능으로서 ECMAScript 2015 사양에서 비로소 표준화되었습니다.
 * 더 나은 지원을 위해 대신 Object.getPrototypeOf()를 사용하세요.
 */
