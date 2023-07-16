import fs from "fs";
import path from "path";
import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import { RequestHandler, Request, Response, NextFunction } from "express";

const requestHandler: RequestHandler = async (req: Request, _res: Response, next: NextFunction) => {
  //the message
  let dateTime: string = await format(new Date(), "dd/MM/yyyy HH:mm:ss");
  let logMessage: string = `${req.method}\t${uuid()}\t${dateTime}\t${req.url}\t${req.headers.origin ? req.headers.origin : ""}\n`;

  //create folder
  if (!fs.existsSync(path.join(__dirname, "..", "logs"))) await fs.mkdirSync(path.join(__dirname, "..", "logs"));

  //append
  await fs.appendFileSync(path.join(__dirname, "..", "logs", "requests.log"), logMessage);

  console.log(logMessage);
  next();
};
export default requestHandler;
