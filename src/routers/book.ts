import { Request, Response, Router } from "express";
import { BookController } from "./../controllers/book";
import { favoritecontroller } from "./../controllers/favorite";

import { middleware } from "../middleware/auth";

const router = Router();

const bookController = new BookController();
const MiddlewareController = new middleware();
const Favoritecontroller = new favoritecontroller();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello from user route");
});

router.get(
  "/getallbook",
  MiddlewareController.isExist,
  bookController.getAllBook
);

router.post("/add", MiddlewareController.isExist, bookController.addBook);
router.get(
  "/getrentbook",
  MiddlewareController.isExist,
  bookController.getRentBook
);
router.get(
  "/getsalebook",
  MiddlewareController.isExist,
  bookController.getSaleBook
);
router.get(
  "/findbook/:id",
  MiddlewareController.isExist,
  bookController.findBook
);
router.post(
  "/addfavorite",
  MiddlewareController.isExist,
  Favoritecontroller.addFavorite
);
router.get(
  "/getfavorite",
  MiddlewareController.isExist,
  Favoritecontroller.getFavorite
);
router.delete(
  "/deletefavorite/:id",
  MiddlewareController.isExist,
  Favoritecontroller.deleteFavorite
);
router.delete(
  "/deletebook/:id",
  MiddlewareController.isExist,
  bookController.deleteBook
);
router.put(
  "/updatebook/:id",
  MiddlewareController.isExist,
  bookController.updateBook
);

export default router;
