import jwt from "jsonwebtoken";
import Veterinarian from "../models/Veterinarian.js";

const authMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.veterinarian = await Veterinarian.findById(decoded.id).select(
        "-password -confirm -token"
      );

      return next();
    } catch (error) {
      console.log(error);
    }
  }

  if (!token) {
    const error = new Error("There is no any token");
    res.status(400).json({ msg: error.message });
  }
  next();
};

export default authMiddleware;
