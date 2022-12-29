class Product {
  constructor(private name: string, private price: number) {
    this.name = name;
    this.price = price;
  }

  Print() {
    return this.name + this.price;
  }
}

class TV extends Product {
  constructor(name: string, price: number, private type: string) {
    super(name, price);
    this.type = type;
  }
}

const pd1 = new Product("환민", 200);
console.log(pd1);

const tv1 = new TV("환민티비", 200, "LED");
console.log(tv1.Print());

export {};
