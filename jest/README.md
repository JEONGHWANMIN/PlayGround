# Jest를 통해서 test를 해봅시다.

expect().toBe(value) value 값이랑 같은면 통과

expect().toEqual(data) 오브젝트 value들 확인 할때 사용

expect().not.toBe(value) expect가 value값이 아니면 통과

### Thruthy

````js
const n = null;

expect(n).toBeNull();
expect(n).toBeDefined();
expect(n).not.toBeUndefined();
expect(n).not.toBeTruthy();
expect(n).toBeFalsy();
```js
````
