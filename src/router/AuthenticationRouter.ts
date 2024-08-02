
import AuthenticationController from "../controller/AuthenticationController";
import BaseRoutes from "./BaseRouter";
import {loginValidator, registerValidator} from "../middleware/Validators/AuthValidator";

class AuthenticationRoutes extends BaseRoutes {
    routes(): void {
        this.router.post("/login", loginValidator, AuthenticationController.login);
        this.router.post("/register", registerValidator, AuthenticationController.register);
    }
}

export default new AuthenticationRoutes().router;
