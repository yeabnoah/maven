import { Router } from "express";
import getMessage from "../controllers/getMessage.controller";
import sendMessage from "../controllers/send-message.controller";
import authMiddleware from "../middleware/auth-middleware";

const messageRoute = Router();

messageRoute.use(authMiddleware);

messageRoute.get("/:id", getMessage);

messageRoute.post("/send/:id", sendMessage);

export default messageRoute;
