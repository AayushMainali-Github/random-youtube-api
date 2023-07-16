//env variables
require("dotenv").config({ path: __dirname + "/.env" });
const PORT = process.env.PORT || 9000;
const DB_KEY = process.env.DB as string;

//imports
import express, { Request, Response } from "express";
import { ResponseErrorData } from "./utils/interfaces/Response";
import mongoose from "mongoose";
import { connectDB } from "./utils/database/dbConn";
import cors from "cors";
import requestHandler from "./middleware/requestHandler";
import errorHandler from "./middleware/errorHandler";
import linkRouter from "./routes/link";
//express app
const app = express();

//main code
app.use(requestHandler);
app.use(cors());
app.use(express.json());

app.use("/link", linkRouter);

app.all("*", (_req: Request, res: Response) => {
  const respData: ResponseErrorData = {
    code: 404,
    message: "404 not found",
  };
  res.status(respData.code).json(respData);
});

app.use(errorHandler);

//database connection
connectDB(DB_KEY);

mongoose.connection.once("open", () => {
  console.log("Connected to database");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

mongoose.connection.on("error", (e) => {
  console.log(e);
});
