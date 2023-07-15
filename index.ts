//env variables
require("dotenv").config({ path: __dirname + "/.env" });
const PORT = process.env.PORT || 9000;
const DB_KEY = process.env.DB as string;

//imports
import express, { Request, Response, NextFunction } from "express";
import { ResponseData, ResponseErrorData } from "./utils/interfaces/Response";
import mongoose from "mongoose";
import { connectDB } from "./utils/database/dbConn";
import cors from "cors";
import { requestHandler } from "./middleware/requestHandler";

//express app
const app = express();

//main code
app.use(requestHandler);
app.use(cors());
app.use(express.json());

app.all("*", (req: Request, res: Response) => {
  const respData: ResponseErrorData = {
    code: 404,
    message: "404 not found",
  };
  res.status(respData.code).json(respData);
});

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
