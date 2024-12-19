import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as express from "express";
import * as mongoose from "mongoose";
import { db_host, mongo_url, port } from "./config/env";
import { AppDataSource } from "./data-source";
import bookRouter from "./routers/book";
import userRouter from "./routers/user";

const app = express();
app.use(express.json());
app.use(cookieParser());
const origin = ["http://localhost:5173"];
app.use(
  cors({
    origin: origin,
    credentials: true,
  })
);

app.use("/user", userRouter);
app.use("/book", bookRouter);

AppDataSource.initialize()
  .then(async () => {
    app.listen(port, async () => {
      await mongoose.connect(mongo_url, { dbName: "book" });
      console.log(`Database connected to ${db_host}`);
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
