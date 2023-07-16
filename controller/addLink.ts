import Link from "../model/Link";
import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { ResponseErrorData, ResponseSuccessData } from "../utils/interfaces/Response";
import { LinkData } from "../utils/interfaces/Link";

const addLink = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  let { link } = req.body;
  //check if link exists
  if (!link) {
    const errRespData: ResponseErrorData = {
      code: 400,
      message: '"link" property not found in the request body',
    };
    res.status(errRespData.code).json(errRespData);
    return;
  }
  //check if link is a valid youtube link
  const errRespData: ResponseErrorData = {
    code: 400,
    message: "The provided link is invalid",
  };
  //check if link is a string
  if (typeof link !== "string") return res.status(errRespData.code).json(errRespData);

  //check if link is valid
  const regexExp: RegExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  const validLink = link.match(regexExp);
  if (!validLink) return res.status(errRespData.code).json(errRespData);

  link = validLink[0];

  //save the link in database
  const obj: LinkData = {
    link,
  };
  const linkData = await Link.create(obj);

  //create a response
  const respData: ResponseSuccessData = {
    code: 200,
    message: "Link has been added to the database",
    data: obj,
  };
  if (linkData) return res.status(respData.code).json(respData);
  else return res.status(errRespData.code).json(errRespData);
});

export default addLink;
