class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  // price에 관한 getter, setter
  get price() {
    return this._price;
  }

  set price(value) {
    if (value < 0) {
      throw new Error("값이 너무 작습니다.");
      return;
    }
    this._price = value;
  }
}

class TV extends Product {
  constructor(name, price, size) {
    super(name, price);
    this.size = size;
  }
}

const tv1 = new TV("환민티비", -2000, "25inch");

console.log(tv1);
