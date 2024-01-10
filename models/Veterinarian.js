import mongoose from "mongoose";
import bcrypt from "bcrypt";

import { generarId } from "../helpers/generarId.js";

const veterinarianSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    default: null,
  },
  web: {
    type: String,
    default: null,
  },
  confirm: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
    default: generarId(),
  },
});

veterinarianSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

veterinarianSchema.methods.confirmPassword = async function (loginPassword) {
  return await bcrypt.compare(loginPassword, this.password);
};

const Veterinarian = mongoose.model("Veterinarian", veterinarianSchema);

export default Veterinarian;
