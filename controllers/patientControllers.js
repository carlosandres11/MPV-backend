import Patient from "../models/Patients.js";

const getPatients = async (req, res) => {
  const patients = await Patient.find()
    .where("veterinarian")
    .equals(req.veterinarian);

  res.json(patients);
};

const addPatient = async (req, res) => {
  const patient = new Patient(req.body);

  try {
    patient.veterinarian = req.veterinarian._id;
    await patient.save();
    res.json(patient);
  } catch (error) {
    console.log(error);
  }
};

const editPatient = async (req, res) => {
  const { id } = req.params;

  const exists = await Patient.findById(id);

  if (!exists) {
    const error = new Error("The patient does not exists in the BD");
    return res.status(400).json({ msg: error.message });
  }

  if (req.veterinarian._id.toString() !== exists.veterinarian._id.toString()) {
    const error = new Error("you do not have access to edit this patient");
    return res.status(400).json({ msg: error.message });
  }

  const { name, owner, email, telephone, date, symptoms } = req.body;

  try {
    exists.name = name || exists.name;
    exists.owner = owner || exists.owner;
    exists.email = email || exists.email;
    exists.telephone = telephone || exists.telephone;
    exists.date = date || exists.date;
    exists.symptoms = symptoms || exists.symptoms;

    await exists.save();

    res.json(exists);
  } catch (error) {
    console.log(error);
  }
};

const deletePatient = async (req, res) => {
  const { id } = req.params;

  const exists = await Patient.findById(id);
  if (!exists) {
    const error = new Error("The patient does not exists in the BD");
    res.status(400).json({ msg: error.message });
  }
  if (req.veterinarian._id.toString() !== exists.veterinarian._id.toString()) {
    const error = new Error("You do not access to delete this patient");
    res.status(400).json({ msg: error.message });
  }

  try {
    await exists.deleteOne();

    res.json({ msg: "The patient has been deleted" });
  } catch (error) {
    console.log(error);
  }
};

export { getPatients, addPatient, editPatient, deletePatient };
