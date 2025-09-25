// 코드 싫행 전 (코드평가)
// var a, let b, const c
// b = 2
// c = 3
// a -> 1


// var, let, const -> 이 3가의 차이점 뭔가요?
// 호이스팅 -> 코드의 선언부가 끌려올려지듯 동작하는 현상
// let, const -> 호이스팅 가능, TDZ 존
// console.log(b)



var a = 1;
let b = 2;
const c = 3;


/**
 * 기존 -> 스타일드 컴포넌트, 이모션 -> CSR 줄어들고
 * 현재 -> 테일윈드 (압도적), vanilla-extract, panda-css
 * 이유 : CSR -> Next.js SSR -> 서버컴포넌트 -> tailwind 사용이 가능
 *
 *
 * Next.js React
 * 상태관리 - zustand, recoil jotai
 *
 * 클라이언트 상태관리 -> zustand, recoil
 * 서버 상태관리 -> tanstack-query
 *
 * css : tailwind, vanilla-extract
 * ui 라이브러리 : radix
 *
 * // client -> server -> 1. A API, 2. B API, 3. C API
 * // server interface  -> client
 */
