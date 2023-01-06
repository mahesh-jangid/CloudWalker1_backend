import express from "express";

const router = express.Router();
import {
  adduserdata,
  authUser,
  deletedata,
  getdataById,
  getuserdata,
  registerUser,
  updatedata,
} from "../controlers/userControler.js";
import { protect } from "../middleware/authMiddleware.js";
router.route("/register").post(registerUser);
router.post("/login", authUser);
router.route("/getdata").get(protect, getuserdata);
router.route("/adddata").post(protect, adduserdata);
router
  .route("/:id")
  .get(protect, getdataById)
  .delete(protect, deletedata)
  .put(protect, updatedata);

export default router;
