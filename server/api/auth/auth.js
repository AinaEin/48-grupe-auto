import express from "express";
import { apiRegisterPost } from "./apiRegisterPost.js";
import { apiLoginPost } from "./apiLoginPost.js";

const authRouter = express.Router();

authRouter.post("/register", apiRegisterPost);
authRouter.post("/login", apiLoginPost);

export { authRouter };
