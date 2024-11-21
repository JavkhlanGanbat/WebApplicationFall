export class CartManager {
    constructor() {
      this.cart = [];
    }
  
    addToCart(bookTitle) {
      const book = books.find((b) => b.title === bookTitle);
      if (book) {
        this.cart.push(book);
        this.updateCartCount();
        this.renderCart();
      }
    }
  
    updateCartCount() {
      const cartCount = document.getElementById("cart-count");
      cartCount.textContent = this.cart.length;
    }
  
    renderCart() {
      const cartContainer = document.getElementById("cart-container");
      cartContainer.innerHTML = `
        <h2>Cart</h2>
        ${this.cart
          .map(
            (book) => `
          <div class="cart-item">
            <h3>${book.title}</h3>
            <p>Price: ${book.price}₮</p>
          </div>
        `
          )
          .join("")}
      `;
      cartContainer.style.display = this.cart.length > 0 ? "block" : "none";
    }
  
    toggleCartVisibility() {
      const cartContainer = document.getElementById("cart-container");
      cartContainer.style.display =
        cartContainer.style.display === "none" ? "block" : "none";
    }
  }
  