import { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { book } from "../entity/book";
import { USER_ID } from "./../config/constance";
import { BookImage } from "./../entity/bookimage";
import { CartModel } from "./../model/cart";

export class cartcontroller {
  private CartModeel = CartModel;
  private BookRepository: Repository<book>;
  private BookImageRepository: Repository<BookImage>;

  constructor() {
    this.BookRepository = AppDataSource.getRepository(book);
    this.BookImageRepository = AppDataSource.getRepository(BookImage);
  }

  getCart = async (req: Request, res: Response) => {
    const userId = req[USER_ID];
    const cart = await this.CartModeel.find({ userId: userId });
    const book = await this.BookRepository.find({
      where: cart.map((item) => ({ id: item.bookId })),
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

  addCart = async (req: Request, res: Response) => {
    const { bookid } = req.body;
    const userid = req[USER_ID];
    if (!bookid) {
      return res.status(400).send({ message: "Please fill all the fields" });
    }
    try {
      const cart = new CartModel();
      cart.bookId = bookid;
      cart.userId = userid;
      await this.CartModeel.create(cart);
      return res.status(201).send({ message: "Add cart successfully" });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };

  deleteCart = async (req: Request, res: Response) => {
    const { bookid } = req.body;
    const userid = req[USER_ID];
    if (!bookid) {
      return res.status(400).send({ message: "Please fill all the fields" });
    }
    try {
      await this.CartModeel.deleteOne({ bookId: bookid, userId: userid });
      return res.status(200).send({ message: "Delete cart successfully" });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };
}
