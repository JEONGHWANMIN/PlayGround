function foo(obj) {
  let data;
  switch (obj.type) {
    case 1:
      data = "1";
      break;
    case 2:
      data = "2";
      break;
    default:
      data = "default";
  }

  return data;
}

function bar(obj) {
  const map = {
    1: "1",
    2: "2",
    default: "기본값",
  };

  return map[obj.type] ? map[obj.type] : map["default"];
}

console.log(foo({ type: 2 }));
console.log(bar({ type: 2 }));
console.log(bar({ type: 1 }));
console.log(bar({ type: 10 }));
