/**
 *
 * @param {*} n : 기간 안에 송아지를 팔아야 하는 숫자
 * @param {*} v : 날짜 예측
 * @returns 기간안에 무조건 송아지를 한마리 팔아야 하고, 송아지 한마리를 다시 사야하는데 이 때 싸게사서 이득을 최대로 봐야한다.
 * 판매가격 - 구매가격
 *
 */
function solution(n, v) {
  let answer = -Infinity;

  while (v.length) {
    const sell = v[0];
    v.splice(0, 1);
    const min_buy = Math.min(...v);
    answer = Math.max(answer, sell - min_buy);
  }

  return answer;
}

console.log(solution(10, [3, 1, 4, 1, 5, 9, 2, 6, 5, 3])); // expect 7
console.log(solution(10, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])); // expect -1
console.log(solution(6, [4, 1, 7, 6, 5, 2])); // expect 5
