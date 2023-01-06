import express from "express";
import rateLimit from "express-rate-limit";
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
router.route("/getdata").get(getuserdata);
router.route("/adddata").post(protect, adduserdata);
router
  .route("/:id")
  .get(getdataById)
  .delete(protect, deletedata)
  .put(protect, updatedata);

export default router;

