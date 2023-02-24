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

console.log(foo({ type: 2 }));
