import { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { book } from "./../entity/book";
import { condition } from "./../entity/condition";
import { postType } from "./../enum/book";
import { statustype } from "./../enum/status";

import { USER_ID } from "../config/constance";
import { Publisher } from "../entity/publisher";
import { Rentbook } from "../entity/rentbook";
import { Salebook } from "../entity/salebook";
import { User } from "../entity/User";
import { StatusCodes } from "../enum/statusCode";
import { Author } from "./../entity/author";

export class BookController {
  private BookRepository: Repository<book>;
  private RentBookRepository: Repository<Rentbook>;
  private SaleBookRepository: Repository<Salebook>;
  private AuthorRepository: Repository<Author>;
  private PublisherRepository: Repository<Publisher>;
  private conditionRepository: Repository<condition>;
  private UserRepository: Repository<any>;

  constructor() {
    this.BookRepository = AppDataSource.getRepository(book);
    this.RentBookRepository = AppDataSource.getRepository(Rentbook);
    this.SaleBookRepository = AppDataSource.getRepository(Salebook);
    this.AuthorRepository = AppDataSource.getRepository(Author);
    this.PublisherRepository = AppDataSource.getRepository(Publisher);
    this.conditionRepository = AppDataSource.getRepository(condition);
    this.UserRepository = AppDataSource.getRepository(User);
  }
  getAllBook = async (req: Request, res: Response) => {
    try {
      const myBook = await this.BookRepository.createQueryBuilder("book")
        .leftJoinAndSelect("book.rentbook", "rentbook")
        .leftJoinAndSelect("book.salebook", "salebook")
        .leftJoinAndSelect("book.author", "author")
        .leftJoinAndSelect("book.publisher", "publisher")
        .leftJoinAndSelect("salebook.condition", "condition")
        .where("salebook.seller = :id", { id: req[USER_ID] })
        .orWhere("rentbook.owner = :id", { id: req[USER_ID] })
        .getRawMany();
      return res.send(myBook).status(StatusCodes.ok);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };

  addBook = async (req: Request, res: Response) => {
    const {
      title,
      author,
      publisher,
      category,
      description,
      type,
      Condition,
      price,
      stock_quantity,
      fivedayprice,
      sevendayprice,
      fourteendayprice,
      phoneNumber,
      lineID,
    } = req.body;
    if (
      !title ||
      !author ||
      !publisher ||
      !category ||
      !description ||
      !type ||
      !phoneNumber ||
      !lineID
    ) {
      return res.status(400).send({ message: "Please fill all the fields" });
    }
    try {
      const newAuthor = new Author();
      newAuthor.name = author;
      this.AuthorRepository.save(newAuthor);
      const newPublisher = new Publisher();
      newPublisher.name = publisher;
      this.PublisherRepository.save(newPublisher);
      const newBook = new book();
      newBook.title = title;
      newBook.author = newAuthor;
      newBook.publisher = newPublisher;
      newBook.category = category;
      newBook.description = description;
      newBook.phoneNumber = phoneNumber;
      newBook.lineID = lineID;
      newBook.type = type;
      if (type === postType.sale) {
        console.log("sale");
        const owner = await this.UserRepository.findOne({
          where: { id: req[USER_ID] },
        });
        const newCondition = new condition();
        newCondition.level = Condition;
        newCondition.description = Condition;
        this.conditionRepository.save(newCondition);
        const newSaleBook = new Salebook();
        newSaleBook.condition = newCondition;
        newSaleBook.price = price;
        newSaleBook.stock_quantity = stock_quantity;
        newSaleBook.seller = owner;
        newSaleBook.book = newBook;
        newBook.salebook = newSaleBook;
        this.SaleBookRepository.save(newSaleBook);
        this.BookRepository.save(newBook);
        return res.send({ message: "Book added successfully" });
      }
      if (type === postType.rent) {
        const owner = await this.UserRepository.findOne({
          where: { id: req[USER_ID] },
        });
        const newRentBook = new Rentbook();
        newRentBook.fivedayprice = fivedayprice;
        newRentBook.sevendayprice = sevendayprice;
        newRentBook.fourteendayprice = fourteendayprice;
        newRentBook.stock_quantity = stock_quantity;
        newRentBook.owner = owner;
        newRentBook.status = statustype.available;
        newRentBook.book = newBook;
        newBook.rentbook = newRentBook;
        this.RentBookRepository.save(newRentBook);
        this.BookRepository.save(newBook);

        // this.RentBookRepository.save(newRentBook);
        // this.BookRepository.save(newBook);
        return res.send({ message: "Book added successfully" });
      }
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };
  getRentBook = async (req: Request, res: Response) => {
    try {
      const rentBooks = await this.BookRepository.createQueryBuilder("book")
        .leftJoinAndSelect("book.rentbook", "rentbook")
        .leftJoinAndSelect("book.author", "author")
        .leftJoinAndSelect("book.publisher", "publisher")
        .where("book.type = :type", { type: postType.rent })
        .getRawMany();
      return res.send(rentBooks).status(StatusCodes.ok);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };
  getSaleBook = async (req: Request, res: Response) => {
    try {
      const saleBooks = await this.BookRepository.createQueryBuilder("book")
        .leftJoinAndSelect("book.salebook", "salebook")
        .leftJoinAndSelect("book.author", "author")
        .leftJoinAndSelect("book.publisher", "publisher")
        .leftJoinAndSelect("salebook.condition", "condition")
        .where("book.type = :type", { type: postType.sale })
        .getRawMany();
      return res.send(saleBooks).status(StatusCodes.ok);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };
  findBook = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const book = await this.BookRepository.createQueryBuilder("book")
        .leftJoinAndSelect("book.rentbook", "rentbook")
        .leftJoinAndSelect("book.salebook", "salebook")
        .leftJoinAndSelect("book.author", "author")
        .leftJoinAndSelect("book.publisher", "publisher")
        .leftJoinAndSelect("salebook.condition", "condition")
        .where("book.id = :id", { id })
        .getRawMany();
      return res.send(book).status(StatusCodes.ok);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };
  deleteBook = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      await this.BookRepository.delete({ id: id });
      return res.send({ message: "Book deleted successfully" });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };
  updateBook = async (req: Request, res: Response) => {
    const {
      title,
      author,
      publisher,
      category,
      description,
      type,
      status,
      Condition,
      price,

      fivedayprice,
      sevendayprice,
      fourteendayprice,
      phoneNumber,
      lineID,
    } = req.body;
    const id = req.params.id;
    if (
      !title ||
      !author ||
      !publisher ||
      !category ||
      !description ||
      !type ||
      !phoneNumber ||
      !lineID
    ) {
      return res.status(400).send({ message: "Please fill all the fields" });
    }
    try {
      const book = await this.BookRepository.createQueryBuilder("book")
        .leftJoinAndSelect("book.rentbook", "rentbook")
        .leftJoinAndSelect("book.salebook", "salebook")
        .where("book.id = :id", { id })
        .getOne();
      book.title = title;
      book.category = category;
      book.description = description;
      book.phoneNumber = phoneNumber;
      book.lineID = lineID;
      book.type = type;
      if (type === postType.sale) {
        const newCondition = new condition();
        newCondition.level = Condition;
        newCondition.description = Condition;
        this.conditionRepository.save(newCondition);
        book.salebook.condition = newCondition;
        book.salebook.price = price;
        this.SaleBookRepository.save(book.salebook);
        this.BookRepository.save(book);
        return res.send({ message: "Book updated successfully", book });
      }
      book.rentbook.status = status;
      book.rentbook.fivedayprice = fivedayprice;
      book.rentbook.sevendayprice = sevendayprice;
      book.rentbook.fourteendayprice = fourteendayprice;
      this.RentBookRepository.save(book.rentbook);
      this.BookRepository.save(book);
      return res.send({ message: "Book updated successfully", book });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };
}
