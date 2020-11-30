const Book = require("../models/book.model.js");

// Create and Save a new book
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Book
    const book = new Book({
      isbn : req.body.isbn,
      name : req.body.name,
      author : req.body.author,
      release_date : req.body.release_date
    });
  
    // Save Book in the database
    Book.create(book, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Book."
        });
      else res.send(data);
    });
  };

// Retrieve all books from the database.
exports.findAll = (req, res) => {
    Book.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving books."
        });
      else res.send(data);
    });
  };

// Find a single book with a isbn
exports.findOne = (req, res) => {
    Book.findByISBN(req.params.isbn, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Book with ISBN ${req.params.isbn}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Book with ISBN " + req.params.isbn
          });
        }
      } else res.send(data);
    });
  };

// Update a book identified by the isbn in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Book.updateByISBN(
      req.params.isbn,
      new Book(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Book with ISBN ${req.params.isbn}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Book with ISBN " + req.params.isbn
            });
          }
        } else res.send(data);
      }
    );
  };
// Delete a book with the specified isbn in the request
exports.delete = (req, res) => {
    Book.remove(req.params.isbn, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Book with ISBN ${req.params.isbn}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Book with ISBN " + req.params.isbn
          });
        }
      } else res.send({ message: `Book was deleted successfully!` });
    });
  };
