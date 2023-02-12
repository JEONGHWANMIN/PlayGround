interface Bird {
  fly();
  layEggs();
}

interface Fish {
  swim();
  layEggs();
}

function getSmallPet(): Fish | Bird {
  // ...
  return {} as Fish | Bird;
}

let pet = getSmallPet();

pet.layEggs(); // 성공
pet.swim(); // 실패 -> 둘 중 하나의 타입으로 정의되기 떄문에 공통적 속성은 성공하지만 다른 경우에는 타입이 다를 수 도 있기 때문에 실패한다.
