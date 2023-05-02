const log = console.log;

const delay = (time, a) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(a), time);
  });

const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));

go1(10, log);
go1(delay(2000, 50), log);

delay(2000, 50).then(log);

delay(3000, 40);
