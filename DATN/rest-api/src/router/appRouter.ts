import express from "express";
import { app } from "../app";
import { RESPONSE_CODE, ResponseBody, STATUS_CODE } from "../constants";
import routerAuth from "./AuthRouter";
import routerBrands from "./BrandsRouter";
import cartsRouter from "./CartsRouter";

import routerImage from "./ImagesRouter";
import routerMaterial from "./MaterialsRouter";
import routerOrigin from "./OriginsRouter";
import paymentRouter from "./PaymentOnlineRouter";

import productsRouter from "./ProductsRouter";

import ordersRouter from "./OrdersRouter";
import routerPromotion from "./PromotionsRouter";
import routerSize from "./SizeRouter";
import routerStyle from "./StylesRouter";
import { uploadRouter } from "./uploadRouter";
import userRouter from "./UserRouter";
import routerVouchers from "./VoucherRouter";

const router = express.Router();

export function appRouter() {
  router.use("/auth", routerAuth);
  router.use("/users", userRouter);
  router.use("/carts", cartsRouter);
  router.use("/styles", routerStyle);
  router.use("/brands", routerBrands);
  router.use("/uploads", uploadRouter);

  router.use("/sizes", routerSize);
  router.use("/images", routerImage);
  router.use("/origins", routerOrigin);
  router.use("/products", productsRouter);
  router.use("/materials", routerMaterial);
  router.use("/promotions", routerPromotion);
  router.use("/vouchers", routerVouchers);
  router.use("/payment-orders", paymentRouter);
  router.use("/orders", ordersRouter);

  router.use("*", (_, res) => {
    res.status(STATUS_CODE.NOT_FOUND).json(
      ResponseBody({
        code: RESPONSE_CODE.NOT_FOUND,
        message: "Không tồn tại đường dẫn",
      })
    );
  });

  app.use(`/api/${process.env.API_VERSION}`, router);
}
