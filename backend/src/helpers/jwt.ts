import jwt from "jsonwebtoken";
import config from "../config/constants";
import ApiError from "./ApiError";

export function generateAccessToken(userData: any) {
  return jwt.sign(
    userData,
    config.JWT_SECRET,
    { expiresIn: "1h" }
  );
}

export function generateRefreshToken(userData: any) {
  return jwt.sign(
    {email: userData},
    config.JWT_SECRET,
    { expiresIn: "72h" }
  );
}

export function verifyToken(token: any): any {
  return jwt.verify(token, config.JWT_SECRET)
}

export function decodeToken(token: any) {
  return jwt.verify(token, config.JWT_SECRET)
}