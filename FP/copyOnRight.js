function push(array, elem) {
  const copy = array.slice();
  copy.push(elem);
  return copy;
}

function add_contact(mail_list, email) {
  return push(mail_list, email);
}

function arraySet(array, idx, value) {
  const copy = array.slice();
  copy[idx] = value;
  return copy;
}

function objectSet(obj, key, value) {
  const copy = { ...obj };
  copy[key] = value;
  return copy;
}

function setPrice(item, price) {
  return objectSet(item, "price", price);
}

function setQuantity(item, quantity) {
  return objectSet(item, "quantity", quantity);
}

function objectDelete(item, key) {
  const copy = { ...item };
  delete copy[key];
  return copy;
}
