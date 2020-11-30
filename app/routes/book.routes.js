module.exports = app => {
    const books = require("../controllers/book.controller.js");

    // Lists all books
    app.get("/books/", books.findAll);

    // Retrieve a single book with isbn
    app.get("/books/:isbn", books.findOne);
  
    // Create a new book
    app.post("/books", books.create);

    // Update a book with isbn
    app.post("/books/:isbn", books.update);
  
    // Delete a book with isbn
    app.delete("/books/:isbn", books.delete);
  
  };