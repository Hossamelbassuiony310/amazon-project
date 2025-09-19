import { cart, removeFromCart, updateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let cartSummaryHTML = "";
cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingProduct = products.find((p) => p.id === productId);

  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${
      matchingProduct.id
    }">
      <div class="delivery-date">Delivery date: Tuesday, June 21</div>
      <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingProduct.image}" />
        <div class="cart-item-details">
          <div class="product-name">${matchingProduct.name}</div>
          <div class="product-price">$${formatCurrency(
            matchingProduct.priceCents
          )}</div>
          <div class="product-quantity">
            <span> Quantity: 
              <span class="js-quantity-label-${matchingProduct.id}">
                ${cartItem.quantity}
              </span> 
            </span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id="${
              matchingProduct.id
            }">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
              matchingProduct.id
            }">
              Delete
            </span>
          </div>
        </div>
      </div>
    </div>
  `;
});

document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

// 🗑️ Delete
document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);
    document.querySelector(`.js-cart-item-container-${productId}`).remove();
  });
});

// ✏️ Update
document.querySelectorAll(".js-update-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    const label = document.querySelector(`.js-quantity-label-${productId}`);

    const currentQty = label.innerText.trim();
    label.outerHTML = `
      <input type="number" min="1" value="${currentQty}" 
        class="js-edit-input-${productId}" style="width:50px;">
      <button class="js-save-btn-${productId}">Save</button>
      <button class="js-cancel-btn-${productId}">Cancel</button>
    `;

    // 🖱️ Save button
    document
      .querySelector(`.js-save-btn-${productId}`)
      .addEventListener("click", () => {
        const newQty = Number(
          document.querySelector(`.js-edit-input-${productId}`).value
        );

        if (newQty > 0) {
          updateCartQuantity(productId, newQty);

          document.querySelector(
            `.js-edit-input-${productId}`
          ).outerHTML = `<span class="js-quantity-label-${productId}">${newQty}</span>`;
          document.querySelector(`.js-save-btn-${productId}`).remove();
          document.querySelector(`.js-cancel-btn-${productId}`).remove();
        } else {
          alert("Quantity must be greater than 0");
        }
      });

    // ❌ Cancel button
    document
      .querySelector(`.js-cancel-btn-${productId}`)
      .addEventListener("click", () => {
        // رجع العدد القديم
        document.querySelector(
          `.js-edit-input-${productId}`
        ).outerHTML = `<span class="js-quantity-label-${productId}">${currentQty}</span>`;
        document.querySelector(`.js-save-btn-${productId}`).remove();
        document.querySelector(`.js-cancel-btn-${productId}`).remove();
      });
  });
});
