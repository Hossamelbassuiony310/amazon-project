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
        $${(product.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select>
          ${Array.from(
            { length: 10 },
            (_, i) =>
              `<option value="${i + 1}" ${i === 0 ? "selected" : ""}>${
                i + 1
              }</option>`
          ).join("")}
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png" />
        Added
      </div>

      <button class="add-to-cart-button button-primary">Add to Cart</button>
    </div>
  `;
});

document.querySelector(".js-product-list").innerHTML = productsHTML;
