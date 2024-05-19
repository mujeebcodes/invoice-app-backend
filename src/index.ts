import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute";
import invoiceRouter from "./routes/invoiceRoute";

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("Connected to the db"));

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/user", userRouter);
app.use("/api/invoices", invoiceRouter);

app.listen(7000, () => {
  console.log("server started on localhost:7000");
});
