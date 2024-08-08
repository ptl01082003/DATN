import express from "express";
import BrandsController from "../controller/BrandsController";
import CartsController from "../controller/CartsController";

const cartsRouter = express.Router();

cartsRouter.post("/", CartsController.create);

export default cartsRouter;
