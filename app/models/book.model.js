const sql = require("./db.js");

// constructor
const Book = function(book) {
  this.isbn = book.isbn;
  this.name = book.name;
  this.author = book.author;
  this.release_date = book.release_date;
};


Book.getAll = result => {
  sql.query("SELECT * FROM books", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("books: ", res);
    result(null, res);
  });
};

Book.create = (newBook, result) => {
  sql.query("INSERT INTO books SET ?", newBook, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created book: ", { ISBN: res.insertISBN, newBook });
    result(null, { ISBN: res.insertISBN, newBook });
  });
};

Book.findByISBN = (bookISBN, result) => {
  sql.query(`SELECT * FROM books where isbn LIKE '${bookISBN}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found book: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found book with the ISBN
    result({ kind: "not_found" }, null);
  });
};

Book.updateByISBN = (isbn, book, result) => {
  sql.query(
    "UPDATE books SET name = ?, author = ?, release_date = ? where isbn LIKE ?",
    [book.name, book.author, book.release_date, isbn],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found book with the isbn
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated book: ", { isbn: isbn, book });
      result(null, { isbn: isbn, book });
    }
  );
};

Book.remove = (isbn, result) => {
  sql.query("DELETE FROM books where isbn LIKE ?", isbn, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found book with the isbn
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted book with isbn: ", isbn);
    result(null, res);
  });
};

module.exports = Book;