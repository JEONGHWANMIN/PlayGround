// ================================ Part1. Asyncronous (비동기) ================================

/*

비동기 : 코드를 실행하고 결과를 기다리지 않고 바로 다음 코드를 실행한다 .

  왜 필요한가 ? 
   -> 애플리케이션 실행시 결괏값이 언제 올지도 모르는데 한 없이 기다릴 순 없기 때문 

*/
/* 동기적 코드 */
// function example() {
//   console.log('안녕! 1');
//   console.log('안녕! 2');
//   console.log('안녕! 3');
// }

// example();

/* 비동기 코드 */
// function example1() {
//   console.log('안녕! 1');

//   setTimeout(function () {
//     console.log('안녕! 2');
//   }, 1000);

//   console.log('안녕! 3');
// }

// example1();

/* 순서대로 바꿔보기 callback 함수 -> 단점 : 컬백 함수로 계속 처리하다보면 컬백 지옥에 빠지게 된다. */

// function example2(callback) {
//   console.log('안녕 1');

//   setTimeout(function () {
//     console.log('안녕 2');
//     callback();
//   }, 1000);
// }

// example2(() => {
//   console.log('안녕 3');
// });

/*
예시 ) https://velog.io/@seul06/JavaScript-%EC%BD%9C%EB%B0%B1-%EC%A7%80%EC%98%A5
example )

step1(function (value1) {
    step2(function (value2) {
        step3(function (value3) {
            step4(function (value4) {
                step5(function (value5) {
                    step6(function (value6) {
                        // Do something with value6
                    });
                });
            });
        });
    });
});

*/
/* 콜백 지옥 해결 방법 Promise  */

// ================================ Part2. Promise (프로미스) ================================
/*

  Promise : 비동기 처리에 사용되는 객체
  왜 필요하고 , 알아야 하나 ? 
   - 콜백 헬에 빠지지 않고 비동기 처리를 정상적으로 할 수 있다.
   - 최근에 많은 비동기 코드들이 프로미스 객체로 만들어 진다.

  1. new 연산자를 통해서 만들 수 있다.
  2. 만든 프로미스는 컬백 함수를 인자로 받는데 그 안에는 2가지 파라미터가 들어간다 . (resolve , reject)

  -> new Promise( (resolve , reject) => {}) 

  Promise 3 가지 상태
    1. Pending (대기)
    2. Fullfill (이행)
    3. Rejected (실패)

  1. Pending (대기)
    new Promise( (resolve , reject) => {} ) 

  2. Fullfill (이행)
    new Promise( (resolve , reject) => {
      resolve()
    } ) 
    이행된 데이터는 then() 이라는 키워드를 통해서 데이터를 받을 수 있다.
    
  3. Rejected (실패)
    new Promise( (resolve , reject) => {
      reject()
    } ) 
    요청 실패된 데이터는 catch() 라는 키워드를 통해서 데이터를 받을 수 있다.

  Promise 개념정리
  1. 비동기 처리 방법 중 하나
  2. Promise는 new 연산자를 사용해서 만들어 낸다 .
  3. Promise는 컬백 함수 인자로 (resolve , reject) 를 받는데 , resolve는 then() , reject() catch() 데이터를 받는다.
*/

/* 1. 사용  */
// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('성공!');
//   }, 3000);
// });

// console.log(promise);

// promise
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

/* 2. 결괏값 then 으로 이어 받기 (Promise Chaining) */

// const promise1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(10);
//   }, 1000);

//   setTimeout(() => {
//     reject(40);
//   }, 2000);
// });

// promise1
//   .then((data) => {
//     console.log(data);
//     return data + 10;
//   })
//   .then((data) => {
//     console.log(data);
//     return data + 10;
//   })
//   .then((data) => {
//     console.log(data);
//     return data + 10;
//   })
//   .then((data) => {
//     console.log('끝 !!', data);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

/* 3. 프로미스 resolve reject!!! -> reject() , resolve()*/

// new Promise((resolve, reject) => {
//   reject(0);
//   resolve(1);
// })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

/* 4. 변수로 프로미스 받기 !! */

// const promise = new Promise((resolve, reject) => {
//   console.log('히히');
//   setTimeout(() => {
//     resolve('성공!!');
//   }, 2000);
// });
// console.log(promise);
// console.log('딴짓 ~ 1 ');
// console.log('딴짓 ~ 2');
// promise.then((data) => {
//   console.log(data);
// });

// const promise = new Promise((resolve, reject) => {
//   reject('실패');
//   setTimeout(() => {
//     resolve('성공');
//   }, 2000);
// });

// promise
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject('실패');
//   }, 2000);
// });

// console.log(promise);

// promise.catch((data) => {
//   console.log(data);
// });

// ================================ Part3. async & await  ================================

/*

async await 이란 ? 
  자바스크립트 비동기 처리 패턴중 제일 최근에 나온 따끈따끈 한 녀석
  1. 컬백함수와 프로미스 단점 보완

  사용 
  1. await 을 사용하려면 함수 앞에 async를 붙여준다 . 
  2. await 뒤에는 promise 객체가 온다. (꼭 프로미스 객체가 올 필요는 없지만 , 대체적으로 프로미스 처리를 위해서 사용됨)
  
  예외처리 (then , catch)
  async await 은 Promise랑 다르게 try {}, catch {}문법을 사용해서 예외처리를 한다.
  try , catch 후 무조건 실행해야 하는 코드가 있을 시 finally {}로 감싸준다.

*/

/* 1. async await 사용 예제  */
// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('성공');
//     reject('실패');
//   }, 2000);
// });

// async function example() {
//   try {
//     let data = await promise;
//     console.log(data);
//   } catch (err) {
//     console.log(err);
//   }
// }

// example();

/* 2. 프로미스 단점 보완 동기적 코드처럼 사용 */

// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(10);
//   }, 1000);
// });

// async function promiseChaing() {
//   let data = await promise;
//   console.log(data);
//   data = data + 10;
//   console.log(data);
//   data = data + 10;
//   console.log(data);
//   data = data + 10;
//   console.log('끝 !!', data);
// }

// promiseChaing();

/* 3. try catch 로 예외처리 하기!! */

// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject('실패!!');
//   }, 2000);
// });

// async function exception() {
//   try {
//     let data = await promise;
//   } catch (error) {
//     console.log(error);
//   } finally {
//     console.log('마지막!');
//   }
// }

// exception();

/* 4. finally */
// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject('실패!!');
//   }, 2000);
// });

// async function exception() {
//   try {
//     let data = await promise;
//   } catch (error) {
//     console.log(error);
//   } finally {
//     console.log('마지막!');
//   }
// }

// exception();

/* 5. async 함수의 성질 이해하기 
 async 함수는 promise 아닌 값을 리턴하더라도 항상 프로미스 resolve() 된 값으로 리턴한다.
*/

// async function example() {
//   return new Promise((resolve, reject) => {
//     resolve('성공');
//   });
// }

// async function example() {
//   return '성공';
// }

// example().then((data) => {
//   console.log(data);
// });

// (async () => {
//   let data = await example();
//   console.log(data);
// })();

// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject('실패');
//   }, 2000);
// });

// promise
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// ================================ Part4. Promise methods  ================================

// Promise.all([])
// 모든 프로미스가 fullfill 상태가 되면 종료된다.
async function PromiseAll() {
  const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise1");
    }, 1000);
  });
  const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise2");
    }, 3000);
  });
  const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise3");
    }, 10000);
  });

  const result = await Promise.all([promise1, promise2, promise3]);
  console.log(result);
  result.map((promise) => {
    console.log(promise);
  });
}

// 하지만 하나라도 Reject 된다면 프로미스가 종료된다.
async function PromiseAllReject() {
  const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("실패1");
    }, 1000);
  });
  const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise2");
    }, 3000);
  });
  const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise3");
    }, 10000);
  });

  const result = await Promise.all([promise1, promise2, promise3]);
  console.log(result);
  result.map((promise) => {
    console.log(promise);
  });
}

// PromiseRace는 무조건 제일 빠른 프로미스를 반환한다.
// 이때 제일 빠른 것이 반환해더라도 함수 실행은 계속 되어있다.
// Promise.race도 Promise.all 과 똑같이 하나라도 reject되면 끝난다.
async function PromiseRace() {
  const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise2");
    }, 3000);
  });
  const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise3");
    }, 10000);
  });
  const promise1 = new Promise((resolve, reject) => {
    // reject("실패!");
    setTimeout(() => {
      resolve("내가 제일 빨라 !!");
    }, 1000);
  });
  const fastPromise = await Promise.race([promise2, promise3, promise1]);
  console.log(fastPromise);
}

// Promise.allSettled는 각각의 성공 및 실패 상태를 배열안에 객체로 리턴해 준다.
// 성공하면 값이 뭔지 , 실패하면 이유가 뭔지 알려준다.
/** 
 [
  { status: 'fulfilled', value: 'promise2 성공!!' },
  { status: 'rejected', reason: 'promise3 실패!!' },
  { status: 'rejected', reason: 'promise 1 실패' }
]
 */
async function PromiseAllSettled() {
  const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise2 성공!!");
    }, 3000);
  });
  const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("promise3 실패!!");
    }, 10000);
  });
  const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("promise 1 실패");
    }, 1000);
  });
  const fastPromise = await Promise.allSettled([promise2, promise3, promise1]);
  console.log(fastPromise);
}
