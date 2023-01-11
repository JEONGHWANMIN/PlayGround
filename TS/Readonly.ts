/**
 * Readonly<T>
 * 모든 타입에 readonly를 붙여주는 유틸 타입
 */

type Readonly1<T> = {
  readonly [P in keyof T]: T[P];
};

interface Todo {
  id: number;
  title: string;
  complete: boolean;
}

type ReadTodo = Readonly1<Todo>;

const todo1: ReadTodo = {
  id: 24,
  title: "asdas",
  complete: true,
};

// todo1.id = 25;

export {};
