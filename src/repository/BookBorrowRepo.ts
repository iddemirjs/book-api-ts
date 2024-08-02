import { BookBorrow } from "../models/BookBorrow";
import { Book } from "../models/Book";
import { User } from "../models/User";

export class BookBorrowRepository {
    async createBookBorrow(borrowData: Partial<BookBorrow>): Promise<BookBorrow> {
        return await BookBorrow.create({
            borrowerId: borrowData.borrowerId,
            bookId: borrowData.bookId,
            borrowStartTime: borrowData.borrowStartTime,
            borrowEndTime: borrowData.borrowEndTime
        });
    }

    async getAllBookBorrows(): Promise<BookBorrow[]> {
        return await BookBorrow.findAll({include: [Book, User]});
    }

    async getBookBorrowById(borrowId: number): Promise<BookBorrow | null> {
        return await BookBorrow.findByPk(borrowId, {include: [Book, User]});
    }

    async updateBookBorrow(borrowId: number, updateData: Partial<BookBorrow>): Promise<[number, BookBorrow[]]> {
        return await BookBorrow.update(updateData, {
            where: {id: borrowId},
            returning: true,
        });
    }

    async deleteBookBorrow(borrowId: number): Promise<number> {
        return await BookBorrow.destroy({
            where: {id: borrowId},
        });
    }

    async getBookBorrowsByBookId(bookId: number): Promise<BookBorrow[]> {
        return await BookBorrow.findAll({where: {bookId}, include: [User]});
    }

    async getBookBorrowsByUserId(userId: number): Promise<BookBorrow[]> {
        return await BookBorrow.findAll({where: {borrowerId: userId}, include: [Book]});
    }

    async updateBookBorrowReturn(bookId: number, userId: number, rating: number): Promise<void> {
        const bookBorrow = await BookBorrow.findOne({
            where: { bookId, borrowerId: userId, rating: null },
            order: [['borrowStartTime', 'DESC']]
        });

        if (bookBorrow) {
            bookBorrow.borrowEndTime = new Date();
            if (rating !== undefined) {
                bookBorrow.rating = rating;
            }
            await bookBorrow.save();
        }
    }
}
