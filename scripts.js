const books = document.querySelector("#books");
const addBookBtn = document.querySelector("#add-book");

// Books to be shown by default on page load
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

// Book constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// add a book to the myLibrary array
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

// remove a book from the myLibrary array
function removeBook(index) {
  myLibrary.splice(index, 1);
}

// toggle read status of a book
function readBook(index) {
  myLibrary[index].read === "Yes"
    ? (myLibrary[index].read = "No")
    : (myLibrary[index].read = "Yes");
}

// Display books on screen
function render() {
  // clear screen to prevent duplcate data
  books.innerHTML = "";

  // Loop over each book writing the data to the screen
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

    // id and dataset to use with event listener
    const bookRead = document.createElement("p");
    bookRead.className = "card-text";
    bookRead.id = "read-book";
    bookRead.dataset.index = `${i}`;
    bookRead.setAttribute("role", "button");
    bookRead.innerHTML = `Have read: ${book.read}`;

    // id and dataset to use with event listener
    const removeBtn = document.createElement("a");
    removeBtn.classList.add("btn", "btn-danger");
    removeBtn.id = "remove-book";
    removeBtn.dataset.index = `${i}`;
    removeBtn.innerHTML = "Remove Book";

    // when delete button is clicked run removeBook function and render the page
    removeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      removeBook(e.target.dataset.index);
      render();
    });

    // when read status is clicked run readBook function and render the page
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

// when add book button is clicked run addBook function and render the apge
addBookBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addBook();
  render();
});

// run render function to display books on page
render();
