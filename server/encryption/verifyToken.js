import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserData } from "../mongoose/mongooseSchema.js";

dotenv.config();

export const verifyToken = async (req, res, next) => {

  const token = req.cookies.logtoken;

  if (!token) return res.status(401).json({ msg : "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await UserData.findById(decoded.id).select("-user_password")
    next();
  } catch (err) {
    res.status(403).json({ msg: "Invalid or expired token" });
  }
};