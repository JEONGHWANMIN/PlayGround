type Human = {
  name: string;
  age: number;
};

// https:https://velog.io/@ymh0951/%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%9A%A9%EB%B2%95%EA%B3%BC-%EA%B5%AC%EC%84%B1TypeScript-Usage-Or-Config

type HumaNoid = Partial<Human>;

const human1: HumaNoid = {};

const human2: HumaNoid = {
  name: "환민",
};

const human3: HumaNoid = {
  name: "환민1",
  age: 24,
};
