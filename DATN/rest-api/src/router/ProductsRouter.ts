// routes/productsRoutes.ts
import express from "express";
import ProductsController from "../controller/ProductsController";
//the
const productsRouter = express.Router();

productsRouter.post("/lst-products", ProductsController.getLstProducts);

productsRouter.post("/product-details", ProductsController.getProductDeatails);

productsRouter.post("/", ProductsController.getProducts);

// productsRouter.use(checkAuth);

// productsRouter.use(checkRoles([ROLE_TYPES.MEMBERSHIP, ROLE_TYPES.ADMIN]));

productsRouter.post("/create", ProductsController.addProduct);

productsRouter.post("/edit", ProductsController.updateProduct);

productsRouter.post("/remove", ProductsController.deleteProduct);

export default productsRouter;
