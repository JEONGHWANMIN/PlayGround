class SingleTon {
  private static instance: SingleTon;

  private constructor() {}

  public static getInstance(): SingleTon {
    if (!SingleTon.instance) {
      SingleTon.instance = new SingleTon();
    }

    return SingleTon.instance;
  }
}

const s1 = SingleTon.getInstance();
const s2 = SingleTon.getInstance();

console.log(s1 === s2);
