export class PaginationManager {
    renderPagination(totalBooks, booksPerPage, currentPage, onPageChange) {
      const pagination = document.querySelector(".pagination");
      pagination.innerHTML = "";
  
      const totalPages = Math.ceil(totalBooks / booksPerPage);
  
      if (currentPage > 1) {
        pagination.innerHTML += `<a href="#" onclick="${onPageChange(
          currentPage - 1
        )}">&laquo;</a>`;
      }
  
      for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `
          <a href="#" 
             class="${currentPage === i ? "active" : ""}" 
             onclick="${onPageChange(i)}">${i}</a>
        `;
      }
  
      if (currentPage < totalPages) {
        pagination.innerHTML += `<a href="#" onclick="${onPageChange(
          currentPage + 1
        )}">&raquo;</a>`;
      }
    }
  }
  