const STORAGE_KEY = 'ananya-reading-list-v1';
const form = document.querySelector('#book-form');
const list = document.querySelector('#book-list');
const empty = document.querySelector('#book-empty');
const count = document.querySelector('#book-count');
const filter = document.querySelector('#status-filter');
const message = document.querySelector('#book-message');
let books = loadBooks();

function loadBooks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(saved) ? saved.filter((book) => book && typeof book.id === 'string') : [];
  } catch {
    return [];
  }
}

function saveBooks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    message.textContent = '';
  } catch {
    message.textContent = 'This browser could not save the list. Your books will remain until this page is closed.';
  }
}

function renderBooks() {
  list.replaceChildren();
  const visibleBooks = books.filter((book) => filter.value === 'all' || book.status === filter.value);
  count.textContent = String(books.length);
  empty.hidden = visibleBooks.length > 0;
  if (books.length > 0 && visibleBooks.length === 0) empty.textContent = 'No books match this status yet.';
  else empty.textContent = 'Your shelf is empty for now. Add a book above to get started.';

  visibleBooks.forEach((book) => {
    const item = document.createElement('article');
    item.className = 'book-item';
    const copy = document.createElement('div');
    copy.className = 'book-copy';
    const title = document.createElement('h3');
    title.textContent = book.title;
    const author = document.createElement('p');
    author.textContent = `by ${book.author}`;
    copy.append(title, author);

    const controls = document.createElement('div');
    controls.className = 'book-controls';
    const status = document.createElement('select');
    status.setAttribute('aria-label', `Reading status for ${book.title}`);
    ['To Read', 'Reading', 'Completed'].forEach((value) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = value;
      option.selected = value === book.status;
      status.append(option);
    });
    status.addEventListener('change', () => {
      books = books.map((entry) => entry.id === book.id ? { ...entry, status: status.value } : entry);
      saveBooks();
      renderBooks();
    });
    const remove = document.createElement('button');
    remove.className = 'delete-book';
    remove.type = 'button';
    remove.textContent = 'Delete';
    remove.setAttribute('aria-label', `Delete ${book.title}`);
    remove.addEventListener('click', () => {
      books = books.filter((entry) => entry.id !== book.id);
      saveBooks();
      renderBooks();
    });
    controls.append(status, remove);
    item.append(copy, controls);
    list.append(item);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.querySelector('#book-title').value.trim();
  const author = document.querySelector('#book-author').value.trim();
  const status = document.querySelector('#book-status').value;
  if (!title || !author) return;
  books.unshift({ id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`, title, author, status });
  saveBooks();
  form.reset();
  document.querySelector('#book-title').focus();
  renderBooks();
});

filter.addEventListener('change', renderBooks);
renderBooks();
