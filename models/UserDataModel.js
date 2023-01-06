import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userdataschema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    fullname: {
      type: String,
      required: true,
    },
    mother_name: {
      type: String,
      required: true,
    },
    user_description: {
      type: String,
      required: true,
    },
    products: [{ type: String, required: true }],
    hobbies: [{ type: String }],
    city: [{ type: String }],
    state: [{ type: String }],
    Postal_code: [{ type: String }],
  },
  {
    timestamps: true,
  }
);
const UserData = mongoose.model("UserData", userdataschema);
export default UserData;
