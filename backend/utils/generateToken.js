import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId: userId }, ENV_VARS.JWT_SECRET, {
    expiresIn: "15d",
  });

  const options = {
    maxAge: 15 * 24 * 60 * 60 * 1000, // expires: new Date(Date.now()+15*24*60*60*1000)
    httpOnly: true, //prevent xss cross attack
    sameSite: "strict", //csrf attack
    secure: ENV_VARS.NODE_ENV !== "development",
  };

  res.cookie("token", token, options);

  return token;
};
