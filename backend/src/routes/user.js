import express from "express";
import signupController from "../controllers/user/singnup";
import loginController from "../controllers/user/login";
import logoutController from "../controllers/user/logout";
import authMiddleware from "../middlewares/auth.middleware";
import getUserDetails from "../controllers/user/getDetails";

const userRouter = express.Router();

userRouter.post("/signup", signupController);
userRouter.post("/login", loginController);
userRouter.post("/logout", logoutController);
userRouter.get("/me", authMiddleware, getUserDetails); // Protected Route

export default userRouter;
