import express from "express";

import {
  getPatients,
  addPatient,
  editPatient,
  deletePatient,
} from "../controllers/patientControllers.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(checkAuth, getPatients).post(checkAuth, addPatient);

router
  .route("/:id")
  .put(checkAuth, editPatient)
  .delete(checkAuth, deletePatient);

export default router;
