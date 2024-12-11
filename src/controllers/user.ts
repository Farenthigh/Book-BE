import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import { Repository } from "typeorm";
import { salt } from "../config/auth";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { Address } from "./../entity/address";

export class usercontroller {
  private userrepository: Repository<User>;
  private addressrepository: Repository<Address>;

  constructor() {
    this.userrepository = AppDataSource.getRepository(User);
    this.addressrepository = AppDataSource.getRepository(Address);
  }
  updateuser = async (req: Request, res: Response) => {
    const {
      firstname,
      lastname,
      email,
      password,
      address_line1,
      subdistrict,
      district,
      province,
      postal_code,
    } = req.body;
    const id = req.params.ID;
    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !address_line1 ||
      !subdistrict ||
      !district ||
      !province ||
      !postal_code
    ) {
      return res.status(400).send({ message: "Please fill all the fields" });
    }
    try {
      const user = await this.userrepository.findOne({ where: { id } });
      user.firstname = firstname;
      user.lastname = lastname;
      user.email = email;
      user.password = await bcrypt.hash(password, salt);
      let address = await this.addressrepository.findOne({
        where: { user: user },
      });
      if (!address) {
        address = new Address();
      }
      address.address_line1 = address_line1;
      address.address_line2 = "";
      address.subdistrict = subdistrict;
      address.district = district;
      address.province = province;
      address.postal_code = postal_code;
      address.user = user;
      await this.addressrepository.save(address);
      await this.userrepository.save(user);
      return res
        .status(201)
        .send({ message: "User updated successfully", user });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };
}
