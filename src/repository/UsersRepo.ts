import {User} from "../models/User";
import {BookBorrow} from "../models/BookBorrow";
import {Book} from "../models/Book";


interface IUsersRepo {
    save(users:User):Promise<void>
    update(user:User):Promise<void>
    delete(userId:number):Promise<void>
    getById(usersId:number):Promise<User | null>
    getAll():Promise<User[]>
    findByEmail(email:string): Promise<User | null>
}

export class UserRepo implements IUsersRepo {
    async delete(userId: number): Promise<void> {
        try {
            const user = await User.findOne({
                where: {
                    id: userId
                }
            });

            if (!user) {
                throw new Error("Bad Request!");
            }

            await user.destroy();
        } catch (e) {
            throw new Error("Failed to deleting user");
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        try {
            return await User.findOne({
                where: {
                    email: email
                }
            });
        } catch (e) {
            throw new Error("Failed to finding user");
        }
    }

    async getAll(): Promise<User[]> {
        try {
            return await User.findAll();
        } catch (e) {
            throw new Error("Failed to fetch all user");
        }
    }

    async getById(usersId: number): Promise<User | null> {
        try {
            const user = await User.scope('withoutPassword').findOne({
                where: {
                    id: usersId
                },
                include: [
                    Book, BookBorrow
                ]
            });

            return user;
        } catch (e) {
            throw new Error("Failed to deleting user");
        }
    }

    async save(users: User): Promise<void> {
        try {
            await User.create({
                name: users.name,
                username: users.username,
                password: users.password,
                email: users.email
            });
        } catch (e) {
            throw new Error("Failed to create user! ⚠️");
        }
    }

    async update(user: User): Promise<void> {
        try {
            const newUser = await  User.findOne({
                where: {
                    id: user.id
                },
                include: [
                    { all: true , nested: true}
                ]
            });

            if (!newUser) {
                throw new Error("User not found.");
            }

            newUser.name = user.name;
            newUser.username = user.username;
            newUser.email = user.email;
            newUser.password = user.password;

            await newUser.save();
        } catch (e) {
            throw new Error("Failed to updating user");
        }
    }
}
