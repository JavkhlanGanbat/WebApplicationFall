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
      description: "Master dat discrete.",
      price: 35000,
      discountedPrice: 26000,
      category: "Mathematics"
    },
    {
      title: "Guide to Linux",
      description: "Join us.",
      price: 20000,
      discountedPrice: 15000,
      category: "Operating Systems"
    },
  ];
  
  window.onload = function () {
    renderBooks(books);
  };
  
  function renderBooks(bookList) {
    const bookGrid = document.getElementById("book-grid");
    bookGrid.innerHTML = ""; // Clear previous content
  
    bookList.forEach((book) => {
      const bookItem = `
        <article class="book-item" style="width: 200px; overflow: hidden;">
          <div class="book-cover" style="height: 200px; background: #f0f0f0;"></div>
          <h3 style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${book.title}</h3>
          <p style="height: 40px; overflow: hidden; text-overflow: ellipsis;">${book.description}</p>
          <p class="price">
            <span class="discounted">${book.discountedPrice}₮</span>
            <span class="original">${book.price}₮</span>
          </p>
          <p>Category: ${book.category}</p>
          <button>Сагслах</button>
        </article>`;
      bookGrid.innerHTML += bookItem;
    });
  }
  
  function sortBooks() {
    const sortValue = document.getElementById("sort-select").value;
    let sortedBooks = [...books];
  
    if (sortValue === "asc") {
      sortedBooks.sort((a, b) => a.discountedPrice - b.discountedPrice);
    } else if (sortValue === "desc") {
      sortedBooks.sort((a, b) => b.discountedPrice - a.discountedPrice);
    }
  
    renderBooks(sortedBooks);
  }
  
  function filterBooks() {
    const searchValue = document.getElementById("search-input").value.toLowerCase();
    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(searchValue)
    );
    renderBooks(filteredBooks);
  }
  
  function filterByCategory() {
    const categoryValue = document.getElementById("category-select").value;
    let filteredBooks = books;
  
    if (categoryValue !== "all") {
      filteredBooks = books.filter((book) => book.category === categoryValue);
    }
  
    renderBooks(filteredBooks);
  }
  