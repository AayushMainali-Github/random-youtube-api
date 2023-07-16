import { Router, Request, Response, IRouter, NextFunction } from "express";
const router = Router();
import addLink from "../controller/addLink";
import getLink from "../controller/getLink";

router
  .route("/")
  .get((req: Request, res: Response, next: NextFunction) => {
    getLink(req, res, next);
  })
  .post((req: Request, res: Response, next: NextFunction) => {
    addLink(req, res, next);
  });
export default router;
