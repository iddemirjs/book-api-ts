import { Request, Response} from "express";
import {UserRepo} from "../repository/UsersRepo";
import Authentication from "../utils/Authentication";
import {User as UserModel} from "../models/User";

class User {
    async update(req: Request, res: Response) {
        try {
            const userInstance = new UserModel(req.body);
            const sessionUser = req.app.locals.credential;
            const targetUser = await new UserRepo().getById(sessionUser.userId);
            if (!targetUser){
                return res.status(500).json({
                    success: false,
                    message: "Your session may be expired"
                });
            }

            userInstance.id = sessionUser.userId;
            userInstance.username = userInstance.username ? userInstance.username : targetUser!.username;
            userInstance.name = userInstance.name ? userInstance.name : targetUser!.name;
            userInstance.email = userInstance.email ? userInstance.email :targetUser!.email;
            userInstance.password = userInstance.password ? await Authentication.passwordHash(userInstance.password) : targetUser!.password;
            await new UserRepo().update(userInstance);

            return res.status(200).json({
                status: "OK",
                message: "Update is successfully.",
                result: {
                    username: userInstance.username,
                    name: userInstance.name,
                    email: userInstance.email
                }
            });
        }catch (e) {
            throw new Error("User not edited.");
        }
    }

    async getUserInfo(req: Request, res: Response) {
        try {
            const { userId } = req.params;

            // Validate userId parameter
            if (!userId || isNaN(Number(userId))) {
                return res.status(400).json({
                    status: "Bad Request",
                    message: "Invalid user ID"
                });
            }

            // Fetch user from the database
            const user = await new UserRepo().getById(Number(userId));

            // Check if user exists
            if (!user) {
                return res.status(404).json({
                    status: "Not Found",
                    message: "User not found"
                });
            }

            // Return user details
            return res.status(200).json({
                status: "OK",
                message: "User details fetched successfully",
                result: user
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: "Internal Server Error",
                message: "An error occurred while fetching user details"
            });
        }
    }
}
export default new User();
