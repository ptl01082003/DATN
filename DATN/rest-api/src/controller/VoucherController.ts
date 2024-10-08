import { Request, Response, NextFunction } from "express";
import { Vouchers } from "../models/Vouchers";
//the
const VoucherController = {
  // CREATE - Add a new voucher
  addVoucher: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        describe,
        discountType,
        discount,
        valueOder,
        discountMax,
        startDay,
        endDay,
        quantity,
        statusDelete,
        formPay,
        status,
        objectuUse,
      } = req.body;

      const voucher = await Vouchers.create({
        describe,
        discountType,
        discount,
        valueOder,
        discountMax,
        startDay,
        endDay,
        quantity,
        statusDelete,
        formPay,
        status,
        objectuUse,
      });

      res.json({ data: voucher, message: "Voucher added successfully" });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  // READ - Get all vouchers
  getVouchers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vouchers = await Vouchers.findAll();
      res.json({ data: vouchers });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  // READ - Get voucher by Id
  getVoucherById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { voucherId } = req.params;
      const vouchers = await Vouchers.findByPk(voucherId);
      if (vouchers) {
        res.json({ data: vouchers });
      } else {
        res.status(404).json({ message: "Voucher not found" });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  // UPDATE - Update voucher by Id
  updateVoucher: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { voucherId } = req.params;
      const { describe, discount } = req.body;

      const vouchers = await Vouchers.findByPk(voucherId);
      if (vouchers) {
        await vouchers.update({
          describe,
          discount,
        });
        res.json({ message: "Voucher updated successfully" });
      } else {
        res.status(404).json({ message: "Voucher not found" });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  // DELETE - Delete voucher by Id
  deleteVoucher: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { voucherId } = req.params;
      const vouchers = await Vouchers.findByPk(voucherId);
      if (vouchers) {
        await vouchers.destroy();
        res.json({ message: "Voucher deleted successfully" });
      } else {
        res.status(404).json({ message: "Voucher not found" });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};

export default VoucherController;
