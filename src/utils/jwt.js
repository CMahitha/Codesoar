import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is required in environment variables");
}

export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
    issuer: "express-auth-app",
    audience: "express-auth-app-users",
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET, {
      issuer: "express-auth-app",
      audience: "express-auth-app-users",
    });
  } catch (error) {
    console.log("[INSIDE_JWT_UTIL_VERIFYTOKEN]", error);
    return null;
  }
};

export const decodeToken = (token) => {
  return jwt.decode(token);
};
