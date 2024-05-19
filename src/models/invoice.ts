import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  postCode: { type: String, required: true },
  country: { type: String, required: true },
});

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  total: { type: Number, required: true },
});

const invoiceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, required: true },
  paymentDate: { type: Date },
  paymentTerms: { type: Number, required: true },
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
    enum: ["pending", "paid"],
    required: true,
    default: "pending",
  },
  clientAddress: { type: addressSchema, required: true },
  items: { type: [itemSchema], required: true },
  total: { type: Number, required: true },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);
export default Invoice;
