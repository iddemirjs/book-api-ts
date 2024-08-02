// noinspection JSAnnotator

import {AllowNull, BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table} from "sequelize-typescript";
import {Book} from "./Book";
import {User} from "./User";

@Table({
    tableName: BookBorrow.VAR_TABLE_NAME
})
export class BookBorrow extends Model {
    public static VAR_TABLE_NAME = "borrow" as string;
    public static VAR_ID = "borrow_id" as string;

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: BookBorrow.VAR_ID
    })
    declare id:number;

    @Column(DataType.INTEGER)
    rating?: number;

    @AllowNull(false)
    @Column(DataType.DATE)
    borrowStartTime!:Date;

    @AllowNull(false)
    @Column(DataType.DATE)
    borrowEndTime!:Date;

    @ForeignKey(() => Book)
    @Column
    declare bookId: number;

    @BelongsTo(() => Book, 'bookId')
    book!: Book;

    @BelongsTo(() => User, 'borrowerId')
    borrowerUser!:User;

    @ForeignKey(() => User)
    @Column
    borrowerId!: number;

}
