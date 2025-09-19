console.log("This is amazon.js file");

const products = [
  {
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: { stars: 4.5, count: 87 },
    priceCents: 1090,
  },
  {
    image: "images/products/intermediate-composite-basketball.jpg",
    name: "Intermediate Size Basketball",
    rating: { stars: 4, count: 127 },
    priceCents: 2095,
  },
  {
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    rating: { stars: 4.5, count: 56 },
    priceCents: 799,
  },
  {
    image: "images/products/men-navigator-sunglasses-brown.jpg",
    name: "Men Navigator Sunglasses Brown",
    rating: { stars: 4, count: 60 },
    priceCents: 1000,
  },
];

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

console.log(productsHTML);

document.querySelector(".js-product-list").innerHTML = productsHTML;
