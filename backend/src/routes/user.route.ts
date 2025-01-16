import { Router } from "express";
import getUser from "../controllers/get-user.controller";
import authMiddleware from "../middleware/auth-middleware";
import editUser from "../controllers/edit-user.controller";

const userRoute = Router();

userRoute.use(authMiddleware);

userRoute.get("/", getUser);
userRoute.patch("/", editUser);

export default userRoute;
