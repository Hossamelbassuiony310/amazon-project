class Cart {
  constructor(storageKey) {
    this.storageKey = storageKey;
    this.cartItem = JSON.parse(localStorage.getItem(this.storageKey)) || [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: "2",
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: "2",
      },
    ];
  }

  saveToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cartItem));
  }

  addToCart(productId, selectedQuantity) {
    let matchingItem = this.cartItem.find(
      (item) => item.productId === productId
    );

    if (matchingItem) {
      matchingItem.quantity += selectedQuantity;
    } else {
      this.cartItem.push({
        productId,
        quantity: selectedQuantity,
        deliveryOptionId: "1",
      });
    }
    this.saveToStorage();
  }

  removeFromCart(productId) {
    this.cartItem = this.cartItem.filter(
      (item) => item.productId !== productId
    );
    this.saveToStorage();
  }

  updateCartQuantity(productId, newQuantity) {
    let matchingItem = this.cartItem.find(
      (item) => item.productId === productId
    );

    if (matchingItem) {
      matchingItem.quantity = newQuantity;
    }
    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem = this.cartItem.find(
      (item) => item.productId === productId
    );
    if (matchingItem) {
      matchingItem.deliveryOptionId = deliveryOptionId;
      this.saveToStorage();
    }
  }
}

const cart = new Cart("cart-oop");
