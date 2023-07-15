import express, { Request, Response, NextFunction } from "npm:express";
import mongoose from "npm:mongoose";
const app = express();
const PORT = Deno.env.get("PORT") || 8080;

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Dinosaur API!");
});

app.listen(PORT);
