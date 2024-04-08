class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  // price에 관한 getter, setter
  get price() {
    return this._price;
  }

  set price(value) {
    if (value < 0) {
      throw new Error("값이 너무 작습니다.");
      return;
    }
    this._price = value;
  }
}

class TV extends Product {
  constructor(name, price, size) {
    super(name, price);
    this.size = size;
  }
}

const tv1 = new TV("환민티비", -2000, "25inch");

console.log(tv1);

const invisible = document.querySelector(img[(id = "togglePassword")]);
let isEyeIconVisible = false;

const invisibleToggle = (e) => {
  isEyeIconVisible = !isEyeIconVisible;
  changePasswordIcon(isEyeIconVisible);
  changePasswordFieldType(isEyeIconVisible);
};

const changePasswordIcon = (isPasswordVisible) => {
  const imageSrc = isPasswordVisible ? "visible" : "invisible";
  e.target.setAttribute("src", `./image/icon/${imageSrc}.svg`);
};

const changePasswordFieldType = (isPasswordVisible) => {
  const passwordField = document.querySelector('input[type="password"]');
  passwordField.type = isPasswordVisible ? "text" : "password";
};

invisible.addEventListener("click", invisibleToggle);
