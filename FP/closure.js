const log = console.log;

let y = 100;
function fn() {
  let x = 10;
  log(x, y);
}

fn();

function outer() {
  let x = 10;
  function inner() {
    log(x);
  }

  return inner;
}

const fn1 = outer();

fn1();
