export const cart = [{}];

export function addToCart(productId, selectedQuantity) {
  let matchingItem = cart.find((item) => item.productId === productId);

  if (matchingItem) {
    matchingItem.quantity += selectedQuantity;
  } else {
    cart.push({ productId, quantity: selectedQuantity });
  }
}
