// 클로저 개념
// 실행 컨텍스트 -> 코드 실행하기 전에 환경을 수집
// 스코프 체이닝

function Outer() {
  const name = "외부 환민";

  return function Inner() {
    const name = "내부 환민";
    console.log("name", name);
  };
}

const name = "환민2";

const Inner = Outer();

Inner();

// Inner -> 내부에 변수가 뭐 있는지, 외부에 뭐가 있는지 수집 완료, -> 외부에 뭐있
