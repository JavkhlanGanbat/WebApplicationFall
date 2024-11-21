import { BookManager } from "./bookManager.js";
import { CartManager } from "./cartManager.js";
import { PaginationManager } from "./paginationManager.js";

const bookManager = new BookManager();
const cartManager = new CartManager();
const paginationManager = new PaginationManager();

window.onload = function () {
  const { category, sort, search, page } = getURLParams();
  const filteredBooks = bookManager.filterAndSortBooks(category, sort, search);

  bookManager.currentPage = page || 1;
  bookManager.renderBooks(filteredBooks, bookManager.currentPage);

  paginationManager.renderPagination(
    filteredBooks.length,
    bookManager.booksPerPage,
    bookManager.currentPage,
    (newPage) => changePage(newPage, filteredBooks)
  );
};

function changePage(newPage, filteredBooks) {
  bookManager.currentPage = newPage;
  bookManager.renderBooks(filteredBooks, newPage);
}

function getURLParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    category: params.get("cat") || "all",
    sort: params.get("sort") || "default",
    search: params.get("search") || "",
    page: parseInt(params.get("page")) || 1,
  };
}
