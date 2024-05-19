import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth";
import invoiceController from "../controllers/invoiceController";

const router = express.Router();

router.get("/", jwtCheck, jwtParse, invoiceController.getInvoices);

export default router;
