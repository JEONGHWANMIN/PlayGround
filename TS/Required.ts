/**
 * Required<T>
 * 타입을 모두 필수적으로 만드는 메서드
 *
 */

type Required1<T> = {
  [P in keyof T]-?: T[P];
};

interface Todo {
  id: number;
  title?: string;
  complete?: boolean;
}

type RTOdo = Required1<Todo>;

const todo1: Todo = {
  id: 24,
};

// const todo2: RTOdo = {
//   id: 24,
// };
