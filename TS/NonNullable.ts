/**
 * NonNullable<T>
 * null, undefined 등 불확실한 타입을 제외하고 타입을 새로 만들어주는 유틸 타입
 */

interface Todo {
  id: number;
  title: string;
  done: boolean;
  check: undefined | null | boolean;
}

type NONULL = NonNullable<Todo>;

const todo1: NONULL = {
  id: 24,
  title: "sdsd",
  done: true,
  check: null,
};

type NAME = string | undefined | boolean;

type NONNULL1 = NonNullable<NAME>;

export {};
