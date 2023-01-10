/**
 * Omit<T>
 * 특정 타입을 제거할 떼 사용하는 유틸리티 타입
 * Exluce<T,U> : Omit 특정 타입을 제거할 떼 사용하는 유틸리티 타입
 *  1. 특정 타입을 제거한 새로운 타입 반환
 *  1-1. keyof T를 받아서 그 키값들이 U랑 같으면 never, 아니면 T타입 그대로 적용
 *  2. Omit은 Pick을 이용하는데 Exclude타입으로 특정 타입을 제외한 타입을 받는다.
 *  2-2. 특정 타입을 제외한 타입을 Pick을 사용해서 집어서 새로운 타입을 만든다.
 */

type Exclude<T, U> = T extends U ? never : T;

type Omit1<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

interface Todo {
  id: number;
  title: string;
  complete: boolean;
}

type NOTITLE = Exclude<keyof Todo, "title">;
type NOID = Exclude<keyof Todo, "id">;
type NOID_TITLE = Exclude<keyof Todo, "id" | "title">;

let name: Todo;

type TodoPreview = Omit1<Todo, "id">;

const todo1: TodoPreview = {
  title: "환민",
  complete: false,
};

export {};
