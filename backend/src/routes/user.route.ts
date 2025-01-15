import { Router } from "express";
import authMiddleware from "../middleware/auth-middleware";
import getUserInfo from "../controllers/user.controller";

const userRoute = Router();

userRoute.use(authMiddleware);

userRoute.get("/", getUserInfo);
// userRoute.patch("/");

export default userRoute;
