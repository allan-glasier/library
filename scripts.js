const books = document.querySelector("#books");
const addBookBtn = document.querySelector("#add-book");

let myLibrary = [
  {
    title: "Gone Girl",
    author: "Gillian Flynn",
    pages: 432,
    read: "No",
  },
  {
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    pages: 224,
    read: "Yes",
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andy Hunt & Dave Thomas",
    pages: 320,
    read: "No",
  },
  {
    title: "Lady of the Lake",
    author: "Andrzej Sapkowski",
    pages: 544,
    read: "No",
  },
  {
    title: "A Dance with Dragons",
    author: "George R. R. Martin",
    pages: 1016,
    read: "No",
  },
  {
    title: "American Dirt",
    author: "Jeanine Cummins",
    pages: 387,
    read: "Np",
  },
];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBook() {
  const title = prompt("What is the title of the book?");
  const author = prompt("Who is the author of the book?");
  const pages = prompt("How many pages in the book?");
  let read = prompt("Have you read the book? ([Y]es or [N]o)");

  if (read.toLowerCase() === "yes" || read.toLowerCase() === "y") {
    read = "Yes";
  } else {
    read = "No";
  }

  myLibrary.push(new Book(title, author, pages, read));
}

function removeBook(index) {
  myLibrary.splice(index, 1);
}

function readBook(index) {
  myLibrary[index].read === "Yes"
    ? (myLibrary[index].read = "No")
    : (myLibrary[index].read = "Yes");
}

function render() {
  books.innerHTML = "";

  myLibrary.forEach((book, i) => {
    const card = document.createElement("div");
    card.classList.add("card", "text-white", "bg-dark", "mb-3");

    const bookTitle = document.createElement("h5");
    bookTitle.classList.add("card-header", "text-center");
    bookTitle.innerHTML = `${book.title}`;

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const bookAuthor = document.createElement("p");
    bookAuthor.className = "card-text";
    bookAuthor.innerHTML = `Author: ${book.author}`;

    const bookPages = document.createElement("p");
    bookPages.className = "card-text";
    bookPages.innerHTML = `Pages: ${book.pages}`;

    const bookRead = document.createElement("p");
    bookRead.className = "card-text";
    bookRead.id = "read-book";
    bookRead.dataset.index = `${i}`;
    bookRead.setAttribute("role", "button");
    bookRead.innerHTML = `Have read: ${book.read}`;

    const removeBtn = document.createElement("a");
    removeBtn.classList.add("btn", "btn-danger");
    removeBtn.id = "remove-book";
    removeBtn.dataset.index = `${i}`;
    removeBtn.innerHTML = "Remove Book";

    removeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      removeBook(e.target.dataset.index);
      render();
    });

    bookRead.addEventListener("click", (e) => {
      readBook(e.target.dataset.index);
      render();
    });

    card.appendChild(bookTitle);
    card.appendChild(cardBody);
    cardBody.appendChild(bookAuthor);
    cardBody.appendChild(bookPages);
    cardBody.appendChild(bookRead);
    cardBody.appendChild(removeBtn);
    books.appendChild(card);
  });
}

addBookBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addBook();
  render();
});

render();
