import express from "express";

import {
  signUp,
  confirmAccount,
  login,
  forgotPassword,
  confirmToken,
  newPassword,
  profile,
  editProfile,
  changePassword,
} from "../controllers/veterinarianControllers.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/sign-up", signUp);
router.get("/confirm-account/:token", confirmAccount);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.route("/forgot-password/:token").get(confirmToken).post(newPassword);

router.get("/profile", checkAuth, profile);
router.put("/edit-profile/:id", checkAuth, editProfile);
router.put("/change-password", checkAuth, changePassword);

export default router;
