import { Router } from "express";
import getUser from "../controllers/get-user.controller";
import authMiddleware from "../middleware/auth-middleware";
import { editUserRoute } from "../controllers/edit-user.controller";
import getAllUsers from "../controllers/get-all-users.controller";

const userRoute = Router();

userRoute.use(authMiddleware);

userRoute.get("/all/", getAllUsers);
userRoute.get("/", getUser);
userRoute.patch("/", ...editUserRoute);

export default userRoute;
