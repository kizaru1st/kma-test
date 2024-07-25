import express from "express";
import userController from "../controllers/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const userRouter = express.Router();
userRouter.use(authMiddleware);
userRouter.get("/api/profile", userController.getUser);
userRouter.delete("/api/logout", userController.logout);
userRouter.patch("/api/update", userController.update);

export { userRouter };
