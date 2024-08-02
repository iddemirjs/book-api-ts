// noinspection JSAnnotator

import {Column, Model, Table, DataType, HasMany} from "sequelize-typescript";
import {BookBorrow} from "./BookBorrow";
import {Book} from "./Book";

@Table({
    tableName: User.VAR_TABLE_NAME,
    scopes: {
        withoutPassword: {
            attributes: { exclude: ['password'] },
        }
    }
})
export class User extends Model {
    public static VAR_TABLE_NAME = "users" as string;
    public static VAR_ID = "id" as string;
    public static VAR_NAME = "name" as string;
    public static VAR_PASSWORD = "password" as string;
    public static VAR_EMAIL = "email" as string;
    public static VAR_USERNAME = "username" as string;

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: User.VAR_ID,
    })
    declare id: number;

    @Column({
        type: DataType.STRING(100),
        field: User.VAR_NAME
    })
    name!: string;

    @Column({
        type: DataType.STRING(100),
        field: User.VAR_PASSWORD
    })
    password!: string;

    @Column({
        type: DataType.STRING(100),
        field: User.VAR_EMAIL
    })
    email!: string;

    @Column({
        type: DataType.STRING(100),
        field: User.VAR_USERNAME
    })
    username!: string;

    @HasMany(() => BookBorrow, {foreignKey: "borrowerId"})
    bookBorrowsHistory?: BookBorrow[]

    @HasMany(() => Book, {foreignKey: "currentBorrowerId"})
    currentBorrowedBooks?: Book[]

}
