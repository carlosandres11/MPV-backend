import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import routerVeterinarian from "./routes/veterinarianRoutes.js";
import routerPatients from "./routes/patientsRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();

connectDB();

const corsOption = {
  origin: "*",
};

app.use(cors(corsOption));

app.use("/api/veterinarians", routerVeterinarian);
app.use("/api/patients", routerPatients);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Servidor conectado en el puerto: ${port}`);
});
