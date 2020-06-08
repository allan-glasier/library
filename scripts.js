const books = document.querySelector("#books");
const addBookBtn = document.querySelector("#add-book");

let myLibrary = [
  {
    title: "Gone Girl",
    author: "Gillian Flynn",
    pages: 432,
    read: false,
  },
  {
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    pages: 224,
    read: true,
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andy Hunt & Dave Thomas",
    pages: 320,
    read: false,
  },
  {
    title: "Lady of the Lake",
    author: "Andrzej Sapkowski",
    pages: 544,
    read: false,
  },
  {
    title: "A Dance with Dragons",
    author: "George R. R. Martin",
    pages: 1016,
    read: false,
  },
  {
    title: "American Dirt",
    author: "Jeanine Cummins",
    pages: 387,
    read: false,
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
    read = true;
  } else {
    console.log(read);
    read = false;
  }

  myLibrary.push(new Book(title, author, pages, read));
}

function removeBook() {}

function render() {
  books.innerHTML = "";

  myLibrary.forEach((book, i) => {
    const div = document.createElement("div");
    books.innerHTML += `
    <div class="card text-white bg-dark mb-3">
      <h5 class="card-header text-center">${book.title}</h5>
      <div class="card-body">
        <p class="card-text">Author: ${book.author}</p>
        <p class="card-text">Pages: ${book.pages}</p>
        <p class="card-text">Have read: ${book.read}</p>
        <a href="#" class="btn btn-danger" id="remove-book" data-index=${i}>
          Remove Book
        </a>
      </div>
    </div>
    `;

    const removeBookBtn = document.querySelector("#remove-book");

    removeBookBtn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(e.target.dataset.index);
      // addBook();
      // render();
    });
  });
}

addBookBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addBook();
  render();
});

render();
