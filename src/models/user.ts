import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  postCode: { type: String, required: true },
  country: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  auth0Id: {
    type: String,
    required: true,
  },

  email: { type: String, required: true },

  name: {
    type: String,
  },
  address: { type: addressSchema },
});

const User = mongoose.model("User", userSchema);
export default User;
