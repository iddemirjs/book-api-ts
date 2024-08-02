// noinspection JSAnnotator

import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {User} from "./User";
import {BookBorrow} from "./BookBorrow";

@Table({
    tableName: Book.VAR_TABLE_NAME
})
export class Book extends Model {
    public  static  VAR_TABLE_NAME = "book" as string;
    public  static  VAR_ID = "id" as string;
    public  static  VAR_NAME = "name" as string;
    public  static  VAR_DESCRIPTION = "description" as string;
    public  static  VAR_IMAGE_URL = "imageUrl" as string;
    public  static  VAR_TOTAL_POINT = "totalPoint" as string;
    public  static  VAR_RATING_COUNT = "ratingCount" as string;

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: Book.VAR_ID
    })
    declare id:number;

    @Column({
        type: DataType.STRING,
        field: Book.VAR_NAME
    })
    name!:string;

    @Column({
        type: DataType.STRING,
        field: Book.VAR_DESCRIPTION
    })
    description!:string;

    @Column({
        type: DataType.STRING,
        field: Book.VAR_IMAGE_URL,
    })
    imageUrl?:string;

    @Column({
        type: DataType.INTEGER,
        field: Book.VAR_TOTAL_POINT,
        defaultValue: 0
    })
    totalPoint?:number;

    @Column({
        type: DataType.INTEGER,
        field: Book.VAR_RATING_COUNT,
        defaultValue: 0
    })
    ratingCount?:number;

    @BelongsTo(() => User,'currentBorrowerId')
    currentBorrower?:User;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER
    })
    currentBorrowerId?: number | null;

    @HasMany(() => BookBorrow, {foreignKey: "bookId"})
    bookBorrowsHistory?: BookBorrow[]

}
