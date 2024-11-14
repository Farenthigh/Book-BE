import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as express from "express";
import { db_host, port } from "./config/env";
import { AppDataSource } from "./data-source";
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

AppDataSource.initialize()
  .then(async () => {
    app.listen(port, () => {
      console.log(`Database connected to ${db_host}`);
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
