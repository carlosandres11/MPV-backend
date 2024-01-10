import mongoose from "mongoose";

const patientsSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    owner: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
    },
    telephone: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    symptoms: {
      type: String,
    },
    veterinarian: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Veterinarian",
    },
  },

  {
    timestamps: true,
  }
);

const Patient = mongoose.model("Patients", patientsSchema);

export default Patient;
