function findMinNumberDivisible(n, k) {
  let num = BigInt(n);
  let targetRemainder = 0n;
  let count = 1;

  while (num % BigInt(k) !== targetRemainder) {
    num = num * 10n + BigInt(n);
    count++;

    if (count > 1000000) {
      // 너무 오래 걸리는 것을 방지하기 위한 임계치
      return -1;
    }
  }

  return count; // 이어붙이기 시작할 때 1부터 시작했으므로 count를 반환
}

let n = 25; // 대상 수
let k = 15; // 나누는 수

let result = findMinNumberDivisible(n, k);
console.log(result); // 결과 출력
