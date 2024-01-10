import Veterinarian from "../models/Veterinarian.js";
import { generarJWT } from "../helpers/generarJWT.js";
import { generarId } from "../helpers/generarId.js";
import { emailSignUp } from "../helpers/emailSignUp.js";
import { emailForgotPassword } from "../helpers/emailForgotPassword.js";

const signUp = async (req, res) => {
  const { email } = req.body;

  const exists = await Veterinarian.findOne({ email });

  if (exists) {
    const error = new Error("The email is already in use");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const veterinarian = new Veterinarian(req.body);
    await veterinarian.save();

    emailSignUp({
      name: veterinarian.name,
      email,
      token: veterinarian.token,
    });

    res.json({ msg: "We've sent you a verification email" });
  } catch (error) {
    console.log(error);
  }
};

const confirmAccount = async (req, res) => {
  const { token } = req.params;

  const exists = await Veterinarian.findOne({ token });

  if (!exists) {
    const error = new Error("This veterinarian does not exists");
    return res.status(400).json({ msg: error.message });
  }

  try {
    exists.token = null;
    exists.confirm = true;
    await exists.save();

    res.json({ msg: "Your account was successfully confirmed" });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const exists = await Veterinarian.findOne({ email });

  if (!exists) {
    const error = new Error("The email does not exists yet");
    return res.status(400).json({ msg: error.message });
  }

  if (!exists.confirm) {
    const error = new Error("Your account has not been confirmed yet");
    res.status(400).json({ msg: error.message });
  }

  if (await exists.confirmPassword(password)) {
    res.json({
      name: exists.name,
      email,
      token: generarJWT(exists._id),
      _id: exists._id,
    });
  } else {
    const error = new Error("The password is incorrect");
    return res.status(400).json({ msg: error.message });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const exists = await Veterinarian.findOne({ email });

  if (!exists) {
    const error = new Error("The account does not exists yet");
    return res.status(400).json({ msg: error.message });
  }

  try {
    exists.token = generarId();
    await exists.save();

    emailForgotPassword({
      name: exists.name,
      email,
      token: exists.token,
    });

    res.json({ msg: "We've sent you a verification email" });
  } catch (error) {
    console.log(error);
  }
};

const confirmToken = async (req, res) => {
  const { token } = req.params;

  const exists = await Veterinarian.findOne({ token });

  if (!exists) {
    const error = new Error("The token is not valid");
    return res.status(400).json({ msg: error.message });
  } else {
    res.json({ msg: "Token valid, vet exists" });
  }
};

const newPassword = async (req, res) => {
  const { passwordd } = req.body;
  const { token } = req.params;

  const exists = await Veterinarian.findOne({ token });

  if (!exists) {
    const error = new Error("there was an error with the token");
    res.status(400).json({ msg: error.message });
  }

  try {
    exists.password = passwordd;
    exists.token = null;
    await exists.save();

    res.json({ msg: "The password has been changed successfully" });
  } catch (error) {
    console.log(error);
  }
};

const profile = async (req, res) => {
  const { veterinarian } = req;
  res.json(veterinarian);
};

const editProfile = async (req, res) => {
  const { id } = req.params;

  const exists = await Veterinarian.findById(id);

  if (!exists) {
    const error = new Error("There is no any vet in the DB to edit it");
    return res.status(400).json({ msg: error.message });
  }
  const { name, email, telephone, web } = req.body;

  try {
    exists.name = name;
    exists.email = email;
    exists.telephone = telephone;
    exists.web = web;

    await exists.save();

    res.json(exists);
  } catch (error) {
    console.log(error);
  }
};

const changePassword = async (req, res) => {
  const { pwd_current, pwd_new } = req.body;
  const { id } = req.veterinarian;

  const exists = await Veterinarian.findById(id);
  if (!exists) {
    const error = new Error(
      "There was an error whit the vet to find it in the DB"
    );
    res.status(400).json({ msg: error.message });
  }
  if (await exists.confirmPassword(pwd_current)) {
    try {
      exists.password = pwd_new;
      await exists.save();

      res.json({ msg: "The password has been changed successfully" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("The current password is incorrect");
    res.status(400).json({ msg: error.message });
  }
};

export {
  signUp,
  confirmAccount,
  login,
  forgotPassword,
  confirmToken,
  newPassword,
  profile,
  editProfile,
  changePassword,
};
