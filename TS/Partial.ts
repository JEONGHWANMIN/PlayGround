/**
 * Partial<T>
 * 각 모든 요소를 옵셔널로 만들어주는 유틸리티 타입
 * 내부 동작
 * 1. 방식 keyof 메서드를 사용해서 제네릭에서 키값을 뽑아서 옵셔널로 만든다.
 *  1.1 keyof 오브젝트 타입의 키를 유니온 타입으로 뽑아내는 연산자
 *  1.2 [P in keyof T]? => 반복문을 이용하여 타입을 선언할 때 사용
 *  1.3 T[P] => Indexed Access Type 오브젝트내 속성의 타입을 뽑아낼때 쓸 수 있다.
 * 2. 옵셔널로 만든 키값에 원래 담겨있던 타입을 다시 담아준다.
 * */

type Partial1<T> = {
  [P in keyof T]?: T[P];
};

interface Human1 {
  name: string;
  age: number;
}

const human_name: Partial1<Human1> = {
  name: "환민",
  age: 24,
};

const human_age: Partial1<Human1> = {
  age: 24,
};

const human_name_age: Partial1<Human1> = {
  name: "환민",
  age: 24,
};

export {};
