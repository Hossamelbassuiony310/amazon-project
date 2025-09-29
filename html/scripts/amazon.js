import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

console.log("This is amazon.js file");

let productsHTML = "";

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image" src="${product.image}" />
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img
          class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png"
        />
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${formatCurrency(product.priceCents)}
      </div>

      <div class="product-quantity-container">
        <select class="product-quantity js-product-quantity-${product.id}">
          ${Array.from(
            { length: 10 },
            (_, i) =>
              `<option value="${i + 1}" ${i === 0 ? "selected" : ""}>${
                i + 1
              }</option>`
          ).join("")}
        </select>
      </div>

      <div class="product-spacer-${product.id} product-spacer-style"></div>

      <div class="added-to-cart js-added-to-cart-${
        product.id
      }" style="display: none;">
        <img src="images/icons/checkmark.png" />
        Added
      </div>

      <button 
        class="add-to-cart-button button-primary js-add-to-cart-button" 
        data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});
document.querySelector(".js-product-list").innerHTML = productsHTML;

function renderCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += Number(item.quantity) || 0;
  });
  document.querySelector(".js-cart-quantity").innerText = cartQuantity;
  return cartQuantity;
}

renderCartQuantity();

document.querySelectorAll(".js-add-to-cart-button").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;

    const quantitySelect = document.querySelector(
      `.js-product-quantity-${productId}`
    );

    const selectedQuantity = Number(quantitySelect.value);

    addToCart(productId, selectedQuantity);

    const cartQuantity = renderCartQuantity();
    console.log(cart);
    console.log("Cart Quantity:", cartQuantity);

    const addedLabel = document.querySelector(`.product-spacer-${productId}`);
    addedLabel.innerHTML = `<img src="images/icons/checkmark.png" /> Added`;
    setTimeout(() => {
      addedLabel.innerHTML = ``;
    }, 2000);
  });
});
