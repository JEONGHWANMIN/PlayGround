interface IteratorYieldResult<T> {
  done?: false;
  value: T;
}

interface IteratorReturnResult {
  done?: true;
  value: undefined;
}

type IteratorResult<T> = IteratorYieldResult<T> | IteratorReturnResult

interface Iterator<T> {
  next(): IteratorResult<T>
}