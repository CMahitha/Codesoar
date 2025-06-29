import { verifyToken } from "../utils/jwt.js";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization Token Required",
      });
    }
    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.json({ message: "invalid token" });
    }

    req.userId = decoded.userId;
    next();
  } catch (e) {
    console.log("[Middleware_auth_error]", e);
    res.json({ message: "something went wrong" }).status(500);
  }
};
