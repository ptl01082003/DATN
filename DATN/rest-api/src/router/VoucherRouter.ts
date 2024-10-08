// routes/styles.ts
import { Router } from "express";
import VoucherController from "../controller/VoucherController";
import { checkAuth } from "../middleware/checkAuth";
import { checkRoles } from "../middleware/checkRoles";
import { ROLE_TYPES } from "../models/Roles";
//the
const routerVoucher = Router();

routerVoucher.post("/", VoucherController.getVouchers);

routerVoucher.use(checkAuth);

routerVoucher.use(checkRoles([ROLE_TYPES.MEMBERSHIP, ROLE_TYPES.ADMIN]));

routerVoucher.post("/create", VoucherController.addVoucher);
routerVoucher.post("/update", VoucherController.updateVoucher);
routerVoucher.post("/remove", VoucherController.deleteVoucher);

export default routerVoucher;
