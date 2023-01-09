/**
 * Omit<T>
 * 특정 타입을 제거할 떼 사용하는 유틸리티 타입
 * Exluce<T,U> : Omit 특정 타입을 제거할 떼 사용하는 유틸리티 타입
 */

// https://medium.com/@yujso66/%EB%B2%88%EC%97%AD-typescript%EC%9D%98-%EC%9C%A0%ED%8B%B8%EB%A6%AC%ED%8B%B0-%ED%83%80%EC%9E%85%EC%9D%80-%EC%96%B4%EB%96%BB%EA%B2%8C-%EA%B5%AC%ED%98%84%EB%90%A0%EA%B9%8C%EC%9A%94-e80fbb33bf24
// T가 U 상속받은 키값이면 never, 상속받은게 아니라면 T 그대로
type Exclude<T, U> = T extends U ? never : T;

interface Todo {
  id: number;
  title: string;
  complete: boolean;
}

type TEST = Exclude<Todo, "title">;

let name: TEST;

type TodoPreview = Omit<Todo, "id">;

const todo1: TodoPreview = {
  title: "환민",
  complete: false,
};

export {};
