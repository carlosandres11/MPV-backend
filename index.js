import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import routerVeterinarian from "./routes/veterinarianRoutes.js";
import routerPatients from "./routes/patientsRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

const allowedDomains = [process.env.FRONTEND_URL];

const corsOption = {
  origin: function (origin, callback) {
    if (allowedDomains.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors"));
    }
  },
};

app.use(cors(corsOption));

app.use("/api/veterinarians", routerVeterinarian);
app.use("/api/patients", routerPatients);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Servidor conectado en el puerto: ${port}`);
});
