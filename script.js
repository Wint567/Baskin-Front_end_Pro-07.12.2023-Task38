const apiUrl = 'https://www.googleapis.com/books/v1/volumes';
let startIndex = 0;
let currentQuery = '';

async function fetchBooks(query, startIndex = 0) {
  const response = await fetch(`${apiUrl}?q=${query}&startIndex=${startIndex}&maxResults=10`);
  const data = await response.json();
  return data.items || [];
}

async function displayBooks(query) {
  try {
    const books = await fetchBooks(query);
    const container = document.getElementById('container');
    container.innerHTML = '';

    books.forEach(book => {
      const bookInfo = book.volumeInfo;
      const title = bookInfo.title;
      const authors = bookInfo.authors ? bookInfo.authors.join(', ') : 'Unknown Author';
      const thumbnail = bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150';

      const card = document.createElement('div');
      card.className = 'book-card';
      card.innerHTML = `
        <img src="${thumbnail}" alt="${title}" style="width: 100%">
        <h3>${title}</h3>
        <p>Author: ${authors}</p>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching and displaying books:', error);
  }
}

function loadMoreBooks() {
  startIndex += 10;
  displayBooks(currentQuery);
}

function searchBooks() {
  const searchInput = document.getElementById('search-input');
  currentQuery = searchInput.value;
  startIndex = 0;
  displayBooks(currentQuery);
}

document.addEventListener('DOMContentLoaded', () => {
  displayBooks();
});
