import asyncHandler from "express-async-handler";
import UserData from "../models/UserDataModel.js";
import User from "../models/userModel.js";

import generateToken from "../utils/generateToken.js";

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!email || !password) {
    res.status(401).json({
      message: "All Fields Are Required",
    });
  }
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message: "Login Success",
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({
      message: "User Not Found",
    });
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({
      message: "User Already Exists",
    });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message: "Register Success",
    });
  } else {
    res.status(400).json({
      message: "Invalid User Data",
    });
  }
});
const getuserdata = asyncHandler(async (req, res) => {
  const userdata = await UserData.find({})
    .populate("user")
    .populate("products.user")
    .lean()
    .exec();
  console.log(userdata);
  res.status(201).json(userdata);
});
const getdataById = asyncHandler(async (req, res) => {
  const product = await UserData.findById(req.params.id);
  if (product) {
    res.status(201).json(product);
  } else {
    res.status(404);
    throw new Error("data not found");
  }
});
const adduserdata = asyncHandler(async (req, res) => {
  const userdata = await UserData.create(req.body);
  console.log(userdata);
  res.status(201).json(userdata);
});
const deletedata = asyncHandler(async (req, res) => {
  const data = await UserData.findById(req.params.id);
  if (data) {
    await data.remove();
    res.json({ message: "data Removed" });
  } else {
    res.status(404);
    throw new Error("data not found");
  }
});

const updatedata = asyncHandler(async (req, res) => {
  const {
    fullname,
    mother_name,
    user_description,
    products,
    hobbies,
    city,
    state,
    Postal_code,
  } = req.body;

  const data = await UserData.findById(req.params.id);
  if (data) {
    data.fullname = fullname;
    data.mother_name = mother_name;
    data.user_description = user_description;
    data.products = products;
    data.hobbies = hobbies;
    data.city = city;
    data.state = state;
    data.Postal_code = Postal_code;
    const updatedProduct = await data.save();
    console.log(updatedProduct);
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("data Not found");
  }
});
export {
  authUser,
  registerUser,
  getuserdata,
  adduserdata,
  deletedata,
  updatedata,
  getdataById,
};
