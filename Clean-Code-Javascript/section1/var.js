// var 사용을 지양하자 .
// 변수명이 덮어짐 -> 협업시 다른 동료들이 선언된 줄 모르고 또 선언해서 변수값이 덮어질 수 있다.
var name = 'Hi1';
var name = 'Hi2';
var name = 'Hi3';

console.log(name);

// let은 바로 오류를 띄운다.
// 선언은 블록당 한번밖에 못한다.
let name2 = 'Hi1';
let name2 = 'Hi2';

console.log(name2);
