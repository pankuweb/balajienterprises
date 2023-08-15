const Book = require("../models/BookModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Get All Books
exports.getAllBooks = catchAsync(async (req, res) => {
  const books = await Book.find();

  res.status(200).json({
    status: "success",
    message: "books get successfully",
    results: books.length,
    data: {
      book: books,
    },
  });
});

//Create Book
exports.createBook = catchAsync(async (req, res, next) => {
  const newBook = await Book.create(req.body);
  res.status(201).json({
    status: "success",
    message: "book created successfully",
    data: {
      book: newBook,
    },
  });
});

//Delete Book
exports.deleteBook = catchAsync(async (req, res, next) => {
  const book = await Book.findByIdAndDelete(req.params.id);

  if (!book) {
    return next(new AppError("No book found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    message: "book deleted successfully",
    data: null,
  });
});
