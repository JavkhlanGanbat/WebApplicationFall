const books = [
  {
    title: "Introduction to Cloud Computing",
    description: "A comprehensive guide to cloud services.",
    price: 25000,
    discountedPrice: 19000,
    category: "Cloud Computing"
  },
  {
    title: "Cloud Architectures",
    description: "Learn how to design scalable cloud solutions.",
    price: 23000,
    discountedPrice: 18000,
    category: "Cloud Computing"
  },
  {
    title: "Advanced Cloud Management",
    description: "Manage cloud platforms efficiently.",
    price: 27000,
    discountedPrice: 20000,
    category: "Cloud Computing"
  },
  {
    title: "Discrete Mathematics and its Application",
    description: "Master discrete mathematics.",
    price: 35000,
    discountedPrice: 26000,
    category: "Mathematics"
  },
  {
    title: "Guide to Linux",
    description: "A beginner's guide to Linux operating systems.",
    price: 20000,
    discountedPrice: 15000,
    category: "Operating Systems"
  },
  {
    title: "Database Systems: The Complete Guide",
    description: "Learn all about modern database systems.",
    price: 30000,
    discountedPrice: 24000,
    category: "Databases"
  },
  {
    title: "Cloud Security Essentials",
    description: "Understand the key aspects of securing cloud infrastructure.",
    price: 27000,
    discountedPrice: 21000,
    category: "Cloud Computing"
  },
  {
    title: "Data Structures and Algorithms",
    description: "The foundation of efficient coding.",
    price: 32000,
    discountedPrice: 25000,
    category: "Computer Science"
  },
  {
    title: "Operating Systems Concepts",
    description: "Learn how operating systems manage resources.",
    price: 25000,
    discountedPrice: 20000,
    category: "Operating Systems"
  },
  {
    title: "Machine Learning for Beginners",
    description: "An introduction to machine learning principles.",
    price: 40000,
    discountedPrice: 30000,
    category: "Artificial Intelligence"
  },
  {
    title: "Deep Learning Explained",
    description: "Master neural networks and deep learning.",
    price: 50000,
    discountedPrice: 40000,
    category: "Artificial Intelligence"
  },
  {
    title: "Introduction to Networks",
    description: "Learn the basics of computer networking.",
    price: 22000,
    discountedPrice: 18000,
    category: "Networking"
  }
];

// State variables for pagination
let currentPage = 1;
const booksPerPage = 9;

// Huudas unshigdahad garaanii query parametruudiig olgono
window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("cat") || "all";
  const sort = params.get("sort") || "default";
  const page = parseInt(params.get("page")) || 1;

  currentPage = page;
  filterAndSortBooks(category, sort);
};
function searchBooks() {
  const searchValue = document.getElementById("search-input").value.toLowerCase();
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchValue)
  );
  renderBooks(filteredBooks);
}
// Nomnuudiig dynamicaar render hiine
function renderBooks(bookList) {
  const bookGrid = document.getElementById("book-grid");
  bookGrid.innerHTML = "";

  const start = (currentPage - 1) * booksPerPage;
  const end = currentPage * booksPerPage;
  const paginatedBooks = bookList.slice(start, end);

  paginatedBooks.forEach((book) => {
    const bookItem = `
      <article class="book-item" style="width: 200px; overflow: hidden;">
        <div class="book-cover" style="height: 200px; background: #f0f0f0;"></div>
        <h3 style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${book.title}</h3>
        <p style="height: 40px; overflow: hidden; text-overflow: ellipsis;">${book.description}</p>
        <p class="price">
          <span class="discounted">${book.discountedPrice}₮</span>
          <span class="original">${book.price}₮</span>
        </p>
        <p>Ангилал: ${book.category}</p>
        <button>Сагслах</button>
      </article>`;
    bookGrid.innerHTML += bookItem;
  });

  // Pag control render
  renderPagination(bookList.length);
}

function renderPagination(totalBooks) {
  const pagination = document.querySelector(".pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(totalBooks / booksPerPage);

  // Pagination html
  if (currentPage > 1) {
    pagination.innerHTML += `<a href="#" onclick="changePage(${currentPage - 1})">&laquo;</a>`;
  }

  for (let i = 1; i <= totalPages; i++) {
    pagination.innerHTML += `<a href="#" class="${currentPage === i ? 'active' : ''}" onclick="changePage(${i})">${i}</a>`;
  }

  if (currentPage < totalPages) {
    pagination.innerHTML += `<a href="#" onclick="changePage(${currentPage + 1})">&raquo;</a>`;
  }
}

// Huudas uurchlugduhud URL shinechlene
function changePage(pageNumber) {
  currentPage = pageNumber;
  const params = new URLSearchParams(window.location.search);
  params.set("page", pageNumber);
  window.history.pushState({}, "", `?${params.toString()}`);
  filterAndSortBooks(params.get("cat"), params.get("sort"));
}

// Nomnuudiig erembeleh, shuuh
function filterAndSortBooks(category = "all", sort = "default") {
  let filteredBooks = [...books];

  if (category !== "all") {
    filteredBooks = filteredBooks.filter(book => book.category === category);
  }

  if (sort === "asc") {
    filteredBooks.sort((a, b) => a.discountedPrice - b.discountedPrice);
  } else if (sort === "desc") {
    filteredBooks.sort((a, b) => b.discountedPrice - a.discountedPrice);
  }

  renderBooks(filteredBooks);
}

// Erembeleh
function sortBooks() {
  const sortValue = document.getElementById("sort-select").value;
  const params = new URLSearchParams(window.location.search);
  params.set("sort", sortValue);
  params.set("page", 1);
  window.history.pushState({}, "", `?${params.toString()}`);
  filterAndSortBooks(params.get("cat"), sortValue);
}

// Shuuh
function filterByCategory() {
  const categoryValue = document.getElementById("category-select").value;
  const params = new URLSearchParams(window.location.search);
  params.set("cat", categoryValue);
  params.set("page", 1);
  window.history.pushState({}, "", `?${params.toString()}`);
  filterAndSortBooks(categoryValue, params.get("sort"));
}