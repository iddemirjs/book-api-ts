import {Model, Sequelize} from "sequelize-typescript";
import * as dotenv from "dotenv";
import {User} from "../models/User";
import {Note} from "../models/Note";
import {Book} from "../models/Book";
import {BookBorrow} from "../models/BookBorrow";

dotenv.config();
class Database {
    public sequelize: Sequelize | undefined;

    private POSTGRES_DB = process.env.POSTGRES_DB as string;
    private POSTGRES_HOST = process.env.POSTGRES_HOST as string;
    private POSTGRES_PORT = process.env.POSTGRES_PORT as unknown as number;
    private POSTGRES_USER = process.env.POSTGRES_USER as string;
    private POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as string;

    constructor() {
        this.connectToPostgreSQL();
    }

    private async connectToPostgreSQL(){
        this.sequelize = new Sequelize(this.POSTGRES_DB, this.POSTGRES_USER, this.POSTGRES_PASSWORD,{
            database: this.POSTGRES_DB,
            dialect: "postgres",
            host: this.POSTGRES_HOST,
            port: this.POSTGRES_PORT,
            username: this.POSTGRES_USER,
            models: [User, Note, Book, BookBorrow]
        });
        await this.sequelize.authenticate().then(()=>{
           console.log("Successfully... 🗄️");
        }).catch((err)=>{
            console.log("Database connection failed!!! ❌")
        });
    }

}

export default Database;
