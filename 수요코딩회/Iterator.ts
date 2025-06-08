interface IteratorYieldResult<T> {
  done?: false;
  value: T;
}

interface IteratorReturnResult {
  done: true;
  value: undefined;
}

interface Iterator<T> { // TS의 `Iterator` 인터페이스 중 필요한 부분만 남겼습니다.
  next(): IteratorYieldResult<T> | IteratorReturnResult;
}

interface Iterable<T> {
  [Symbol.iterator](): Iterator<T>;
}

function* map<A, B>(f: (a: A) => B, iterable: Iterable<A>): IterableIterator<B> {
  for (const value of iterable) {
    yield f(value);
  }
}

function* filter<A>(f: (a: A) => boolean, iterable: Iterable<A>): IterableIterator<A> {
  for (const value of iterable) {
    if (f(value)) yield value
  }
}

function* take<A>(limit: number, iterable: Iterable<A>): IterableIterator<A> {
  const iterator = iterable[Symbol.iterator]();
  while (true) {
    const { value, done } = iterator.next();
    if (done) break;
    yield value;
    if (--limit === 0) break;
  }
}

function* chunk<T>(size: number, iterable: Iterable<T>): IterableIterator<T[]> { // ①
  const iterator = iterable[Symbol.iterator]();
  while (true) {
    const arr = [
      ...take(size, {
        [Symbol.iterator]() {
          return iterator;
        },
      }),
    ];
    if (arr.length) yield arr;
    if (arr.length < size) break; // ②
  }
}

function forEach<A>(f: (a: A) => void, iterable: Iterable<A>): void {
  for (const a of iterable) {
    f(a);
  }
}

interface IterableIterator<T> extends Iterator<T> {
  [Symbol.iterator](): IterableIterator<T>;
}

function fx<A>(iterable: Iterable<A>) {
  return new FxIterable(iterable)
}

class FxIterable<A> {

  constructor(private iterable: Iterable<A>) {
    this.iterable = iterable;
  }

  map<B>(f: (a: A) => B): FxIterable<B> {
    return fx(map(f, this.iterable));
  }

  filter(f: (a: A) => boolean): FxIterable<A> {
    return fx(filter(f, this.iterable));
  }

  forEach(f: (a: A) => void) {
    return forEach(f, this.iterable);
  }

  take(limit: number) {
    return fx(take(limit, this.iterable))
  }

  chunk(size: number): FxIterable<A[]> {
    return fx(chunk(size, this.iterable))
  }

  // to 함수 추가: FxIterable을 종료하고 다른 함수로 변환
  to<B>(f: (iterable: Iterable<A>) => B): B {
    return f(this.iterable);
  }
}

fx(new Set([1,2,3,4,5]))
  .filter((num => num < 5))
  .map((num => num * 2))
  .take(4)
  .forEach(console.log)

// -------------------------------------------------------------------------------------

function delay<T>(time: number, value: T) {
  return new Promise((resolve) => {
    setTimeout(resolve, time, value)
  })
}

// getFile 함수 추가: 파일을 가져오는 비동기 함수 (mock)
async function getFile(filename: string): Promise<File> {
  // 실제로는 fetch나 파일 시스템 API를 사용하겠지만, 여기서는 mock
  await delay(Math.random() * 1000 + 500, null); // 500-1500ms 랜덤 딜레이

  // File 객체 mock (실제 브라우저 환경에서는 File 생성자 사용)
  const mockFile = {
    name: filename,
    size: Math.floor(Math.random() * 10000),
    type: filename.includes('.png') ? 'image/png' :
      filename.includes('.pdf') ? 'application/pdf' :
        'text/html',
    lastModified: Date.now()
  } as File;

  return mockFile;
}

delay(1000, "Hello")
  .then((result) => console.log(result))

fx(new Set([1,2,3,4,5]))
  .map((num => num * 2))
  .chunk(2)
  .forEach(console.log)

async function fromAsync<T>(
  iterable: Iterable<Promise<T>>
): Promise<T[]> {
  const arr: T[] = [];
  for await (const a of iterable) {
    arr.push(a);
  }
  return arr;
}

const executeWithLimit = <T>(fs: (() => Promise<T>)[], limit: number): Promise<T[]> =>
  fx(fs)
    .chunk(limit)  // [() => P<T>, () => P<T>, ...], [...] - 3개씩 그룹화
    .map(fs => fs.map(f => f()))  // [P<T>, P<T>, P<T>], [...] - 비동기 함수 실행
    .map(ps => Promise.all(ps))  // P<[T, T, T]>, [...] - 3개씩 대기하도록 Promise.all로 감싸기
    .to(fromAsync)  // P<[T, T, T], ...] > - Promise.all들의 결과 꺼내기
    .then(arr => arr.flat());

// 테스트 함수
async function test() {
  const files: File[] = await executeWithLimit([
    () => getFile('1-img.png'),
    () => getFile('2-book.pdf'),
    () => getFile('3-index.html'),
    () => getFile('4-img2.png'),
    () => getFile('5-book.pdf'),
    () => getFile('6-index.html'),
    () => getFile('7-img.png'),
  ], 3);

  console.log(files);
}

test()

export {}
