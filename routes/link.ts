import { Router, Request, Response, IRouter } from "express";
const router = Router();

router
  .route("/")
  .get((req: Request, res: Response) => {
    console.log("A");
  })
  .post((req: Request, res: Response) => {
    console.log("B");
  });
export default router;
