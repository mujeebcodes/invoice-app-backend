import { Request, Response } from "express";
import Invoice from "../models/invoice";

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

export default { getInvoices };
