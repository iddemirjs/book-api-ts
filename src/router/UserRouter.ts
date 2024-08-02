import UserController from "../controller/UserController"
import { auth } from "../middleware/AuthMiddleware";
import BaseRoutes from "./BaseRouter";
import {userUpdateValidator} from "../middleware/Validators/UserValidator";

class UserRouter extends BaseRoutes {
    routes(): void {
        this.router.put('/', userUpdateValidator ,auth, UserController.update);
        this.router.get('/:userId',auth, UserController.getUserInfo);
    }
}

export default new UserRouter().router;
