const request = require("supertest");
let { app } = require("../index.js");
let { fetchAllBooks } = require("../controllers/books.js");

const http = require("http");

jest.mock("../controllers/books.js", () => ({
  ...jest.requireActual("../controllers/books.js"),
  fetchAllBooks: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Api testing for books api", () => {
  //Exercise 3: Test Retrieve All Books
  it("/books should return all books data", async () => {
    fetchAllBooks.mockResolvedValue([
      {
        bookId: 1,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
      },
      {
        bookId: 2,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
      },
      {
        bookId: 3,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
      },
    ]);
    let res = await request(server).get("/books");
    expect(res.status).toEqual(200);
    expect(res.body).toEqual([
      {
        bookId: 1,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
      },
      {
        bookId: 2,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
      },
      {
        bookId: 3,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
      },
    ]);
  });

  //Exercise 4: Test Retrieve Employee by ID
  it("/books/details/id  should return an book", async () => {
    let response = await request(server).get("/books/details/1");
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      bookId: 1,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Fiction",
    });
  });
});

describe("functions testing for book api", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //Exercise 5: Mock the Get All Books Function
  it("book function test", async () => {
    let mockedBooks = [
      {
        bookId: 1,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
      },
      {
        bookId: 2,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
      },
      {
        bookId: 3,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
      },
    ];
    fetchAllBooks.mockReturnValue(mockedBooks);
    let response = await fetchAllBooks();
    expect(response).toEqual(mockedBooks);
    expect(response.length).toBe(3);
  });
});
