import mongoose from "mongoose";
import { addressSchema } from "./user";

const generateCustomId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetters =
    letters.charAt(Math.floor(Math.random() * 26)) +
    letters.charAt(Math.floor(Math.random() * 26));
  const randomNumbers = Math.floor(1000 + Math.random() * 9000).toString();
  return `${randomLetters}${randomNumbers}`;
};

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  total: { type: Number, required: true },
});

const invoiceSchema = new mongoose.Schema({
  _id: { type: String, default: generateCustomId },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, required: true },
  paymentDue: { type: Date },
  paymentTerms: { type: Number, required: true },
  description: { type: String, required: true },
  clientName: {
    type: String,
    required: true,
  },
  clientEmail: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["draft", "pending", "paid"],
    required: true,
    default: "pending",
  },
  clientAddress: { type: addressSchema, required: true },
  items: { type: [itemSchema], required: true },
  total: { type: Number, required: true },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);
export default Invoice;
