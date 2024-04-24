import express from "express";
import { authRouter } from "./auth/auth.js";
import { carsRouter } from "./cars/cars.js";
import { cartRouter } from "./cart/cart.js";

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/cars", carsRouter);
apiRouter.use("/cart-details", cartRouter);

export { apiRouter };
