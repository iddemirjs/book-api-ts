import {Book} from "../models/Book";
import {BookBorrow} from "../models/BookBorrow";
import {User} from "../models/User";
import {BookBorrowRepository} from "./BookBorrowRepo";

export class BookRepo {
    async createBook(bookData: Partial<Book>): Promise<Book> {
        return (await Book.create({
            name: bookData.name,
            description: bookData.description,
            imageUrl: bookData.imageUrl
        }));
    }

    async getAllBooks(): Promise<Book[]> {
        return await Book.findAll({
            include: [
                {
                    model: User.scope('withoutPassword'),
                },
                {
                    model: BookBorrow
                },

            ]
        });
    }

    async getBookById(bookId: number): Promise<Book | null> {
        return await Book.findByPk(bookId, {
            include: [
                {
                    model: User,
                    attributes: { exclude: ['password'] }
                },
                {
                    model: BookBorrow
                }
            ]
        });
    }

    async updateBook(bookId: number, updateData: Partial<Book>): Promise<[number, Book[]]> {
        return await Book.update(updateData, {
            where: { id: bookId },
            returning: true,
        });
    }

    async deleteBook(bookId: number): Promise<number> {
        return await Book.destroy({
            where: { id: bookId },
        });
    }

    async borrowBook(bookId: number, userId: number, day:number): Promise<Book | null> {
        const book = await Book.findByPk(bookId);
        if (book && book.currentBorrowerId === null) {
            book.currentBorrowerId = userId;
            await book.save();

            const bookBarrow = new BookBorrow();
            bookBarrow.bookId = bookId;
            bookBarrow.borrowerId = userId;

            const borrowStartTime = new Date();
            const borrowEndTime = new Date(borrowStartTime);
            borrowEndTime.setDate(borrowEndTime.getDate() + day);
            bookBarrow.borrowStartTime = borrowStartTime;
            bookBarrow.borrowEndTime = borrowEndTime;
            const bookBorrowRepo = await new BookBorrowRepository().createBookBorrow(bookBarrow);

            return book;
        }
        return null;
    }

    async returnBook(bookId: number): Promise<Book | null> {
        const book = await Book.findByPk(bookId);
        if (book) {
            book.currentBorrowerId = null;
            await book.save();
            return book;
        }
        return null;
    }
}
