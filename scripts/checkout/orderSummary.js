import {
  cart,
  removeFromCart,
  updateCartQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "./../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOption } from "../../data/deliveryOption.js";

function renderOrderSummary() {
  // ✅ Load delivery options from localStorage
  const savedOptions =
    JSON.parse(localStorage.getItem("deliveryOptions")) || {};

  // Build cart summary (apply saved delivery options first)
  cart.forEach((cartItem) => {
    if (savedOptions[cartItem.productId]) {
      cartItem.deliveryOptionId = savedOptions[cartItem.productId];
    }
  });

  let cartSummaryHTML = "";
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = products.find((p) => p.id === productId);
    const deliveryOptionId = cartItem.deliveryOptionId;

    let selectedDeliveryOption = deliveryOption.find(
      (option) => option.id === deliveryOptionId
    );

    const today = dayjs();
    const deliveryDate = today.add(selectedDeliveryOption.deliveryDays, "day");
    const dataString = deliveryDate.format("dddd, MMMM D");

    cartSummaryHTML += `
  <div class="cart-item-container js-cart-item-container-${matchingProduct.id}"
       data-product-id="${matchingProduct.id}" 
       data-delivery-option-id="${selectedDeliveryOption.id}">
    <div class="delivery-date">Delivery date: ${dataString}</div>
    <div class="cart-item-details-grid">
      <img class="product-image" src="${matchingProduct.image}" />
      <div class="cart-item-details">
        <div class="product-name">${matchingProduct.name}</div>
        <div class="product-price">
          $${formatCurrency(matchingProduct.priceCents)}
        </div>

        <div class="product-quantity">
          <span> Quantity: 
            <span class="js-quantity-label-${matchingProduct.id}">
              ${cartItem.quantity}
            </span> 
          </span>
          <span class="update-quantity-link link-primary js-update-link" 
                data-product-id="${matchingProduct.id}">
            Update
          </span>
          <span class="delete-quantity-link link-primary js-delete-link" 
                data-product-id="${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <!-- ✅ Shipping Options -->
      ${deliveryOptions(matchingProduct, cartItem)}
      <!-- ✅ End Shipping Options -->

    </div>
  </div>
`;
  });

  function deliveryOptions(matchingProduct, cartItem) {
    let deliveryOptionSummaryHTML = `
    <div class="delivery-options">
      <div class="delivery-options-title">Choose a delivery option:</div>
  `;

    deliveryOption.forEach((option) => {
      const today = dayjs();
      const deliveryDate = today.add(option.deliveryDays, "day");
      const dataString = deliveryDate.format("dddd, MMMM D");
      const isChecked = option.id === cartItem.deliveryOptionId;

      const priceString =
        option.priceCents === 0
          ? "FREE Shipping"
          : `$${formatCurrency(option.priceCents)} - Shipping`;

      deliveryOptionSummaryHTML += `
      <div class="delivery-option">
        <input 
          type="radio" 
          class="delivery-option-input" 
          name="delivery-option-${matchingProduct.id}" 
          value="${option.id}"
          ${isChecked ? "checked" : ""}
        />
        <div>
          <div class="delivery-option-date">${dataString}</div>
          <div class="delivery-option-price">${priceString}</div>
        </div>
      </div>
    `;
    });

    deliveryOptionSummaryHTML += `</div>`;

    return deliveryOptionSummaryHTML;
  }

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  // ✅ Delivery option radio change handler
  document.querySelectorAll(".delivery-option-input").forEach((input) => {
    input.addEventListener("change", (event) => {
      const productId = event.target.name.replace("delivery-option-", "");
      const optionId = event.target.value;

      // find matching option
      const option = deliveryOption.find((o) => o.id === optionId);

      if (option) {
        // 1️⃣ Update delivery date UI
        const newDate = dayjs()
          .add(option.deliveryDays, "day")
          .format("dddd, MMMM D");
        document.querySelector(
          `.js-cart-item-container-${productId} .delivery-date`
        ).innerText = `Delivery date: ${newDate}`;

        // 2️⃣ Save selection in localStorage
        const savedOptions =
          JSON.parse(localStorage.getItem("deliveryOptions")) || {};
        savedOptions[productId] = optionId;
        localStorage.setItem("deliveryOptions", JSON.stringify(savedOptions));

        // 3️⃣ Update cart state in memory
        updateDeliveryOption(productId, optionId);
      }
    });
  });

  // 🗑️ Delete
  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      document.querySelector(`.js-cart-item-container-${productId}`).remove();
    });
  });

  // ✏️ Update quantity
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
          // return to original state
          document.querySelector(
            `.js-edit-input-${productId}`
          ).outerHTML = `<span class="js-quantity-label-${productId}">${currentQty}</span>`;
          document.querySelector(`.js-save-btn-${productId}`).remove();
          document.querySelector(`.js-cancel-btn-${productId}`).remove();
        });
    });
  });
}

export { renderOrderSummary };
