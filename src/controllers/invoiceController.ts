import { Request, Response } from "express";
import Invoice from "../models/invoice";
import mongoose from "mongoose";

const getInvoices = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.body;
    const invoices = await Invoice.find({ user: req.userId });

    if (invoices.length === 0) {
      return res.json([]);
    }

    res.json(invoices);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting restaurants" });
  }
};

const createInvoice = async (req: Request, res: Response) => {
  try {
    const { createdAt, paymentTerms, ...invoiceData } = req.body;

    const paymentDue = new Date(createdAt);
    paymentDue.setDate(paymentDue.getDate() + paymentTerms);

    const invoice = new Invoice({
      ...invoiceData,
      user: new mongoose.Types.ObjectId(req.userId),
      paymentTerms,
      createdAt: new Date(createdAt),
      paymentDue: paymentDue,
    });
    invoice.total = invoice.items.reduce((sum, item) => sum + item.total, 0);
    await invoice.save();
    res.status(201).send(invoice);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export default { getInvoices, createInvoice };
