import { Request, Response } from "express";
import { Book } from "../models/Book";
import { BookRepo } from "../repository/BookRepo";
import {BookBorrowRepository} from "../repository/BookBorrowRepo";

class BookController {
    async create(req: Request, res: Response) {
        try {
            const { name, description, imageUrl } = req.body;

            const newBook = new Book();
            newBook.name = name;
            newBook.description = description;
            newBook.imageUrl = imageUrl;

            await new BookRepo().createBook(newBook);

            return res.status(201).json({
                status: "Ok!",
                message: "Successfully created book!",
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "Internal server error!",
                message: "Internal server error!",
            });
        }
    }

    async borrow(req: Request, res: Response) {
        try {
            const sessionUser = req.app.locals.credential;
            const { bookId} = req.params;
            const { day } = req.body;
            const { userId } = sessionUser;

            const book = await new BookRepo().borrowBook(parseInt(bookId), userId, day);
            if (!book) {
                return res.status(404).json({
                    status: "Not Found",
                    message: "Book not found or already borrowed"
                });
            }

            return res.status(200).json({
                status: "Ok!",
                message: "Successfully borrowed book!",
                book: book
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "Internal server error!",
                message: "Internal server error!",
            });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const books = await new BookRepo().getAllBooks();

            return res.status(200).json({
                status: "Ok!",
                message: "Successfully fetched all books!",
                result: books,
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "Internal server error!",
                message: "Internal server error!",
            });
        }
    }

    async getBookDetails(req: Request, res: Response) {
        try {
            const { bookId } = req.params;
            const book = await new BookRepo().getBookById(parseInt(bookId));
            if (!book) {
                return res.status(404).json({
                    status: "Not Found",
                    message: "Book not found",
                });
            }

            return res.status(200).json({
                status: "Ok!",
                message: "Successfully fetched book details!",
                result: book,
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "Internal server error!",
                message: "Internal server error!",
            });
        }
    }

    async returnBook(req: Request, res: Response) {
        try {
            const sessionUser = req.app.locals.credential;
            const { bookId } = req.params;
            const { rating } = req.body;
            const { userId } = sessionUser;

            const book = await new BookRepo().getBookById(parseInt(bookId));
            if (!book || book.currentBorrowerId !== userId) {
                return res.status(404).json({
                    status: "Not Found",
                    message: "Book not found or not borrowed by the user"
                });
            }

            book.currentBorrowerId = null;
            if (rating !== undefined) {
                book.totalPoint = !book.totalPoint ? rating : parseInt(String(book.totalPoint)) + parseInt(rating);
                book.ratingCount =  !book.ratingCount ? 1 : parseInt(String(book?.ratingCount)) + 1;
            }

            await book.save();

            await new BookBorrowRepository().updateBookBorrowReturn(parseInt(bookId), parseInt(userId), parseInt(rating));

            return res.status(200).json({
                status: "Ok!",
                message: "Successfully returned book!",
                book: book
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: "Internal server error!",
                message: "Internal server error!",
            });
        }
    }
}

export default new BookController();
