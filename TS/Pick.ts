/**
 * Pick<Type, keys>
 * 특정 타입 안에서 원하는 타입을 뽑아쓸 때 사용 유틸리티 타입
 *
 */

type Pick1<T, KEYS extends keyof T> = {
  [P in KEYS]: T[P];
};

interface Todo {
  id: number;
  title: string;
  complete: boolean;
}

type TodoPreview = Pick1<Todo, "title" | "complete">;

const todo1: TodoPreview = {
  title: "환민",
  complete: true,
};

export {};
