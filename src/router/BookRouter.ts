import BookController from "../controller/BookController";
import { auth } from "../middleware/AuthMiddleware";
import BaseRoutes from "./BaseRouter";
import {validateCreateBook, validateBorrowBook, returnBookValidator} from "../middleware/Validators/BookValidator"

class BookRoutes extends BaseRoutes {
    routes(): void {
        this.router.post("/create", auth, validateCreateBook, BookController.create);
        this.router.post("/:bookId/borrow", auth, validateBorrowBook, BookController.borrow);
        this.router.post("/:bookId/return", auth, returnBookValidator, BookController.returnBook);
        this.router.get("/", auth, BookController.getAll);
        this.router.get("/:bookId", auth, BookController.getBookDetails);
    }
}

export default new BookRoutes().router;
