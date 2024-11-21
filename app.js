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

let currentPage = 1;
const booksPerPage = 9;

// URL параметрүүдийг шинэчлэх
function updateURL(params = {}) {
  const urlParams = new URLSearchParams(window.location.search);
  
  // Одоо байгаа параметрүүдийг хадгалах
  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === 'all' && key === 'cat' || value === 'default' && key === 'sort') {
      urlParams.delete(key);
    } else {
      urlParams.set(key, value);
    }
  });

  // URL шинэчлэх
  const newURL = `${window.location.pathname}${urlParams.toString() ? '?' + urlParams.toString() : ''}`;
  window.history.pushState({}, '', newURL);
}

// URL-с параметрүүдийг уншиж авах
function getURLParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    category: params.get('cat') || 'all',
    sort: params.get('sort') || 'default',
    page: parseInt(params.get('page')) || 1,
    search: params.get('search') || ''
  };
}

// Хуудас ачаалагдахад
window.onload = function () {
  const { category, sort, page, search } = getURLParams();
  currentPage = page;
  
  // Search input-д утга оноох
  const searchInput = document.getElementById('search-input');
  if (searchInput && search) {
    searchInput.value = search;
  }
  
  // Select elements-д утга оноох
  const sortSelect = document.getElementById('sort-select');
  const categorySelect = document.getElementById('category-select');
  
  if (sortSelect) sortSelect.value = sort;
  if (categorySelect) categorySelect.value = category;
  
  filterAndSortBooks(category, sort, search);
};

// URL өөрчлөгдөхөд
window.onpopstate = function() {
  const { category, sort, page, search } = getURLParams();
  currentPage = page;
  filterAndSortBooks(category, sort, search);
};

function searchBooks() {
  const searchValue = document.getElementById('search-input').value.toLowerCase();
  updateURL({
    search: searchValue || null,
    page: 1
  });
  
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchValue)
  );
  renderBooks(filteredBooks);
}

// Хайлтын debounce функц
let searchTimeout;
function debounceSearch() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(searchBooks, 300);
}

function renderBooks(bookList) {
  const bookGrid = document.getElementById('book-grid');
  bookGrid.innerHTML = '';

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
      <button onclick="addToCart('${book.title}')">Сагслах</button>
    </article>
    `;
    bookGrid.innerHTML += bookItem;
  });

  renderPagination(bookList.length);
}

function renderPagination(totalBooks) {
  const pagination = document.querySelector('.pagination');
  pagination.innerHTML = '';

  const totalPages = Math.ceil(totalBooks / booksPerPage);

  if (currentPage > 1) {
    pagination.innerHTML += `<a href="#" onclick="changePage(${currentPage - 1}); return false;">&laquo;</a>`;
  }

  for (let i = 1; i <= totalPages; i++) {
    pagination.innerHTML += `
      <a href="#" 
         class="${currentPage === i ? 'active' : ''}" 
         onclick="changePage(${i}); return false;">${i}</a>
    `;
  }

  if (currentPage < totalPages) {
    pagination.innerHTML += `<a href="#" onclick="changePage(${currentPage + 1}); return false;">&raquo;</a>`;
  }
}

function changePage(pageNumber) {
  currentPage = pageNumber;
  updateURL({ page: pageNumber });
  
  const { category, sort, search } = getURLParams();
  filterAndSortBooks(category, sort, search);
}

function filterAndSortBooks(category = 'all', sort = 'default', search = '') {
  let filteredBooks = [...books];

  // Хайлтаар шүүх
  if (search) {
    filteredBooks = filteredBooks.filter(book => 
      book.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Ангилалаар шүүх
  if (category !== 'all') {
    filteredBooks = filteredBooks.filter(book => book.category === category);
  }

  // Эрэмбэлэх
  if (sort === 'asc') {
    filteredBooks.sort((a, b) => a.discountedPrice - b.discountedPrice);
  } else if (sort === 'desc') {
    filteredBooks.sort((a, b) => b.discountedPrice - a.discountedPrice);
  }

  renderBooks(filteredBooks);
}

function sortBooks() {
  const sortValue = document.getElementById('sort-select').value;
  updateURL({
    sort: sortValue,
    page: 1
  });
  
  const { category, search } = getURLParams();
  filterAndSortBooks(category, sortValue, search);
}

function filterByCategory() {
  const categoryValue = document.getElementById('category-select').value;
  updateURL({
    cat: categoryValue,
    page: 1
  });
  
  const { sort, search } = getURLParams();
  filterAndSortBooks(categoryValue, sort, search);
}
const cart = [];

function addToCart(bookTitle) {
  const book = books.find(b => b.title === bookTitle);
  if (book) {
    cart.push(book);
    document.getElementById('cart-count').textContent = cart.length;
    renderCart();
  }
}

function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  cartCount.textContent = cart.length;
}

function renderCart() {
  const cartContainer = document.getElementById('cart-container');
  cartContainer.innerHTML = `
    <h2>Сагс</h2>
    ${cart.map(book => `
      <div class="cart-item">
        <h3>${book.title}</h3>
        <p>Үнэ: ${book.price}₮</p>
      </div>
    `).join('')}
  `;
  cartContainer.style.display = cart.length > 0 ? 'block' : 'none';
}

function toggleCart() {
  const cartContainer = document.getElementById('cart-container');
  cartContainer.style.display = cartContainer.style.display === 'none' ? 'block' : 'none';
}
