import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { Repository } from "typeorm";
import { salt } from "../config/auth";
import { AppDataSource } from "../data-source";
import { Cookie } from "../entity/Cookie";
import { cookiesConfig, jwtSecret } from "./../config/auth";
import { User } from "./../entity/User";
import { StatusCodes } from "./../enum/statusCode";

export class auth {
  private userRepository: Repository<User>;
  private cookieRepository: Repository<Cookie>;
  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
    this.cookieRepository = AppDataSource.getRepository(Cookie);
  }

  register = async (req: Request, res: Response) => {
    const { email, password, firstname, lastname, role } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
    }
    const alluser = await this.userRepository.find();
    const users = await this.userRepository.find({
      where: {
        email: email,
      },
    });
    if (!users) {
      return res.status(StatusCodes.conflict).send({
        error: "This email is already use",
      });
    }
    try {
      const user = new User();
      user.email = email;
      user.password = await bcrypt.hash(password, salt);
      user.firstname = firstname;
      user.lastname = lastname;
      user.role = role || "user";
      const payload = {
        id: user.id,
      };
      const token = jwt.sign(payload, jwtSecret, { algorithm: "HS256" });
      const cookie = new Cookie();
      cookie.id = token;
      cookie.user = user;
      cookie.createdAt = new Date();
      cookie.expiredAt = new Date(new Date().setDate(new Date().getDate() + 3));
      await this.userRepository.save(user);
      await this.cookieRepository.save(cookie);
      return res
        .status(201)
        .cookie("token", token, cookiesConfig)
        .send({ message: "สร้างบัญชีผู้ใช้สำเร็จ" });
    } catch (error) {
      return res.status(StatusCodes.serverError).send({
        error: error.message,
      });
    }
  };
  me = async (req: Request, res: Response) => {
    const { token } = req.cookies;
    try {
      const response = await this.cookieRepository
        .createQueryBuilder("cookie")
        .leftJoinAndSelect("cookie.user", "user")
        .select("cookie")
        .addSelect("user.id")
        .addSelect("user.email")
        .addSelect("user.firstname")
        .addSelect("user.lastname")
        .addSelect("user.role")
        .where("cookie.id = :token", { token })
        .getOne();
      if (!response)
        return res
          .status(StatusCodes.unAuthorized)
          .send({ message: "Session expire, please login again" });
      return res.status(StatusCodes.ok).send(response.user);
    } catch (error) {
      return res.status(StatusCodes.serverError).send({
        message: error.message,
      });
    }
  };
  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        return res.status(StatusCodes.badRequest).send({
          message: "Please enter email and password",
        });
      }
      const user = await this.userRepository
        .createQueryBuilder("user")
        .where("user.email = :email", { email })
        .getOne();
      if (!user) {
        return res
          .status(StatusCodes.notFound)
          .send({ message: "email or password in invalid" });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(StatusCodes.notFound)
          .send({ message: "email or password in invalid" });
      }
      const payload = {
        id: user.id,
      };
      const token = jwt.sign(payload, jwtSecret, { algorithm: "HS256" });
      const cookie = new Cookie();
      cookie.id = token;
      cookie.user = user;
      cookie.createdAt = new Date();
      cookie.expiredAt = new Date(new Date().setDate(new Date().getDate() + 3));
      await this.cookieRepository.delete({
        user: user,
      });
      await this.cookieRepository.save(cookie);
      return res
        .status(StatusCodes.ok)
        .cookie("token", token, cookiesConfig)
        .send({ message: "Login success" });
    } catch (error) {
      return res.status(StatusCodes.serverError).send({
        message: error.message,
      });
    }
  };
  logout = async (req: Request, res: Response) => {
    try {
      const { token } = req.cookies;
      await this.cookieRepository.delete(token);
      return res
        .status(StatusCodes.ok)
        .clearCookie("token")
        .send({ message: "Logout success" });
    } catch (error) {
      return res.status(StatusCodes.serverError).send({
        message: error.message,
      });
    }
  };
}
