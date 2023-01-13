/**
 * Extract<T,U>
 * T,U 타입에서 공통되는 타입을 뽑아서 새로운 타입을 만들어 준다.
 */

type E1 = Extract<"a" | "b" | "c", "b" | "c">;

export {};
