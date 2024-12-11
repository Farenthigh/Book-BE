import { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { USER_ID } from "./../config/constance";
import { FavoriteBook } from "./../entity/favbook";

export class favoritecontroller {
  private FavoriteBookRepository: Repository<FavoriteBook>;

  constructor() {
    this.FavoriteBookRepository = AppDataSource.getRepository(FavoriteBook);
  }
  getFavorite = async (req: Request, res: Response) => {
    const userid = req[USER_ID];
    const favorite = await this.FavoriteBookRepository.createQueryBuilder(
      "favorite"
    )

      .leftJoinAndSelect("favorite.book", "book")

      .where("favorite.user = :userid", { userid })
      .getMany();
    return res.status(200).send(favorite);
  };
  addFavorite = async (req: Request, res: Response) => {
    const { bookid } = req.body;
    const userid = req[USER_ID];
    if (!bookid) {
      return res.status(400).send({ message: "Please fill all the fields" });
    }
    try {
      const favorite = new FavoriteBook();
      favorite.book = bookid;
      favorite.user = userid;
      await this.FavoriteBookRepository.save(favorite);
      return res.status(201).send({ message: "Add favorite successfully" });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };

  deleteFavorite = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userid = req[USER_ID];
    try {
      await this.FavoriteBookRepository.delete({ book: id, user: userid });
      return res.status(200).send({ message: "Delete favorite successfully" });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };
}
