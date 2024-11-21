import { books } from "../books.js";

export class BookManager {
  constructor() {
    this.booksPerPage = 9;
    this.currentPage = 1;
  }

  filterAndSortBooks(category = "all", sort = "default", search = "") {
    let filteredBooks = [...books];

    if (search) {
      filteredBooks = filteredBooks.filter((book) =>
        book.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "all") {
      filteredBooks = filteredBooks.filter((book) => book.category === category);
    }

    if (sort === "asc") {
      filteredBooks.sort((a, b) => a.discountedPrice - b.discountedPrice);
    } else if (sort === "desc") {
      filteredBooks.sort((a, b) => b.discountedPrice - a.discountedPrice);
    }

    return filteredBooks;
  }

  renderBooks(bookList, currentPage) {
    const bookGrid = document.getElementById("book-grid");
    bookGrid.innerHTML = "";

    const start = (currentPage - 1) * this.booksPerPage;
    const end = currentPage * this.booksPerPage;
    const paginatedBooks = bookList.slice(start, end);

    paginatedBooks.forEach((book) => {
      const bookItem = `
        <article class="book-item">
          <div class="book-cover"></div>
          <h3>${book.title}</h3>
          <p>${book.description}</p>
          <p class="price">
            <span class="discounted">${book.discountedPrice}₮</span>
            <span class="original">${book.price}₮</span>
          </p>
          <p>Category: ${book.category}</p>
          <button onclick="cartManager.addToCart('${book.title}')">Add to Cart</button>
        </article>
      `;
      bookGrid.innerHTML += bookItem;
    });
  }
}
