const express = require("express");
let { fetchAllBooks, fetchBookById } = require("./controllers/books.js");
const app = express();

app.use(express.json());

//Exercise 1: Retrieve All Books
app.get("/books", async (req, res) => {
  try {
    let books = await fetchAllBooks();
    if (books.length === 0)
      return res.status(404).json({ message: "No books found" });
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Exercise 2: Retrieve Book by ID
app.get("/books/details/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let books = await fetchBookById(id);
    if (!books) return res.status(404).json({ message: "No book found" });
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = { app };
