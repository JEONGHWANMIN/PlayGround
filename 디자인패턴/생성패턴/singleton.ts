/*
구현방법
1. 싱글턴 인스턴스의 저장을 위해 클래스에 비공개 정적 필드를 추가하세요.
2. 싱글턴 인스턴스를 가져오기 위한 공개된 정적 생성 메서드를 선언하세요.
3. 정적 메서드 내에서 '지연된 초기화'를 구현하세요. 그러면 이것은 첫 번째 호출에서 새 객체를 만든 후 그 객체를 정적 필드에 넣을 것입니다. 이 메서드는 모든 후속 호출들에서 항상 해당 인스턴스를 반환해야 합니다.
4. 클래스의 생성자를 비공개로 만드세요. 그러면 클래스의 정적 메서드는 여전히 생성자를 호출할 수 있지만 다른 객체들은 호출할 수 없을 것입니다.
5. 클라이언트 코드를 살펴보며 싱글턴의 생성자에 대한 모든 직접 호출들을 싱글턴의 정적 생성 메서드에 대한 호출로 바꾸세요. 
*/

class SingleTon {
  private static instance: SingleTon;

  private constructor() {}

  public static getInstance(): SingleTon {
    if (!SingleTon.instance) {
      SingleTon.instance = new SingleTon();
    }

    return SingleTon.instance;
  }
}

const s1 = SingleTon.getInstance();
const s2 = SingleTon.getInstance();

console.log(s1 === s2);
