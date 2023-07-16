import Link from "../model/Link";
import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { ResponseSuccessData } from "../utils/interfaces/Response";
import { LinkData } from "../utils/interfaces/Link";

const getLink = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  //generate a random num
  let totalCount: number = await Link.count({});
  let randomNum: number = Math.floor(Math.random() * totalCount);

  //get data
  let linkData = await Link.find({}).limit(1).skip(randomNum).lean();
  let returnData: LinkData = {
    link: linkData[0].link,
    id: linkData[0].id,
  };

  //return data
  let respData: ResponseSuccessData = {
    code: 200,
    message: "Success",
    data: returnData,
  };
  return res.status(respData.code).json(respData);
});

export default getLink;
