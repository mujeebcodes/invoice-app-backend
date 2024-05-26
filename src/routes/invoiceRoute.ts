import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth";
import invoiceController from "../controllers/invoiceController";
import { validateInvoiceRequest } from "../middleware/validation";

const router = express.Router();

router.get("/", jwtCheck, jwtParse, invoiceController.getInvoices);
router.post(
  "/",
  jwtCheck,
  jwtParse,
  validateInvoiceRequest,
  invoiceController.createInvoice
);

export default router;
