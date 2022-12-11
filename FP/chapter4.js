function update_shipping_icons() {
  // 기타로직
  if (get_free_shipping(item.price + shopping_cart_total)) {
    // 기타로직
  }
}

function get_free_shipping(price, total) {
  return price + total >= 20;
}
