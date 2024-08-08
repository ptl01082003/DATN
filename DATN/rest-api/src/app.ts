import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express, { Request, Response } from "express";
import { Send } from "express-serve-static-core";
import { connectDB } from "./config/ConnectDB";
import { redis } from "./config/ConnectRedis";
import { RESPONSE_CODE, ResponseBody, STATUS_CODE } from "./constants";
import { appRouter } from "./router/appRouter";
import cron from "node-cron";
import { Promotions, PROMOTIONS_STATUS } from "./models/Promotions";
import { updateProductPrices } from "../src/utils/utils";
import moment from "moment";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
    interface Response {
      json: Send<
        {
          code: number;
          data: any;
          message: string;
        },
        this
      >;
    }
  }
}

export const app = express();

app.use(
  cors({
    origin: ["http://localhost:3001", "http://localhost:3000"],
    credentials: true,
  })
);

app.use("/public", express.static("public"));

redis.initial();

connectDB();

//PUBLIC ROUTER
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

appRouter();

cron.schedule(
  "40 21 * * *",
  () => {
    console.log("hello");
  },
  {
    scheduled: true,
    timezone: "Asia/Ho_Chi_Minh",
  }
);

cron.schedule("* * * * *", async () => {
  console.log(`Cron job bắt đầu lúc: ${new Date().toLocaleString()}`);
  try {
    await updateProductPrices();
  } catch (error) {
    console.error("Lỗi khi thực hiện cron job:", error);
  }
});

app.use("*", (_, res) => {
  res.status(STATUS_CODE.NOT_FOUND).json(
    ResponseBody({
      code: RESPONSE_CODE.ERRORS,
      message: "Đường dẫn không tồn tại",
    })
  );
});

app.listen(process.env.SERVER_PORT, () =>
  console.log("The server is running on port:" + process.env.SERVER_PORT)
);
