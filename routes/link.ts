import { Router, Request, Response, IRouter, NextFunction } from "express";
const router = Router();
import addLink from "../controller/addLink";

router
  .route("/")
  .get((req: Request, res: Response, next: NextFunction) => {
    console.log("A");
  })
  .post((req: Request, res: Response, next: NextFunction) => {
    addLink(req, res, next);
  });
export default router;
