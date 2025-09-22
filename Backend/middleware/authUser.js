import { User } from "../model/user.js";
import jwt from "jsonwebtoken";

// Authenticate user (from cookie or Bearer token)
export const isAuthenticated = async (req, res, next) => {
  try {
    let token;

    // 1️⃣ Check cookie
    if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    // 2️⃣ Check Authorization Header
    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Agar token hi nahi mila
    if (!token) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Store user in request
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in Authentication Middleware:", error.message);
    return res.status(401).json({ error: "User not authenticated" });
  }
};

// Authorize admin (role based)
export const isAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: `User with role ${req.user.role} is not authorized` });
    }
    next();
  };
};
