import { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { book } from "../entity/book";
import { USER_ID } from "./../config/constance";
import { BookImage } from "./../entity/bookimage";
import { FavoriteModel } from "./../model/favorite";

export class favoritecontroller {
  private FavoriteModel = FavoriteModel;
  private BookRepository: Repository<book>;
  private BookImageRepository: Repository<BookImage>;

  constructor() {
    this.BookRepository = AppDataSource.getRepository(book);
    this.BookImageRepository = AppDataSource.getRepository(BookImage);
  }

  getFavorite = async (req: Request, res: Response) => {
    const userId = req[USER_ID];
    const favorite = await this.FavoriteModel.find({ userId: userId });
    const book = await this.BookRepository.find({
      where: favorite.map((item) => ({ id: item.bookId })),
    });
    const image = await this.BookImageRepository.createQueryBuilder("BookImage")
      .leftJoinAndSelect("BookImage.Book", "Book")
      .getRawMany();
    const images = image.map((img) => {
      return {
        image: img.BookImage_image,
        book: img.Book_id,
      };
    });
    const result = book.map((item) => {
      const img = images.filter((image) => {
        return image.book === item.id;
      });
      return {
        ...item,
        image: img,
      };
    });
    const rentBook = result.filter((item) => item.type === "rent");
    const saleBook = result.filter((item) => item.type === "sale");
    return res.status(200).send({ rentBook: rentBook, saleBook: saleBook });
  };
  addFavorite = async (req: Request, res: Response) => {
    const { bookid } = req.body;
    const userid = req[USER_ID];
    if (!bookid) {
      return res.status(400).send({ message: "Please fill all the fields" });
    }
    try {
      const favorite = new FavoriteModel();
      favorite.bookId = bookid;
      favorite.userId = userid;
      await this.FavoriteModel.create(favorite);
      return res.status(201).send({ message: "Add favorite successfully" });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };
  deleteFavorite = async (req: Request, res: Response) => {
    const { bookid } = req.body;
    const userid = req[USER_ID];
    try {
      await this.FavoriteModel.deleteOne({ bookId: bookid, userId: userid });
      return res.status(200).send({ message: "Delete favorite successfully" });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };
  // getFavoriteRent = async (req: Request, res: Response) => {
  //   const userId = req[USER_ID];
  //   const favorite = await this.FavoriteModel.find({
  //     where: { userId: userId, type: "rent" },
  //   });
  //   return res.status(200).send(favorite);
  // };
  // getFavoriteSale = async (req: Request, res: Response) => {
  //   const userid = req[USER_ID];
  //   const favorite = await this.FavoriteModel.find({
  //     where: { user: userid, type: "sale" },
  //   });
  //   return res.status(200).send(favorite);
  // };
}
// };
// addFavorite = async (req: Request, res: Response) => {
//   const { bookid } = req.body;
//   const userid = req[USER_ID];
//   if (!bookid) {
//     return res.status(400).send({ message: "Please fill all the fields" });
//   }
//   try {
//     const favorite = new FavoriteBook();
//     favorite.book = bookid;
//     favorite.user = userid;
//     await this.FavoriteBookRepository.save(favorite);
//     return res.status(201).send({ message: "Add favorite successfully" });
//   } catch (error) {
//     return res.status(500).send({ message: error.message });
//   }
// };

// deleteFavorite = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const userid = req[USER_ID];
//   try {
//     await this.FavoriteBookRepository.delete({ book: id, user: userid });
//     return res.status(200).send({ message: "Delete favorite successfully" });
//   } catch (error) {
//     return res.status(500).send({ message: error.message });
//   }
// };
// }
