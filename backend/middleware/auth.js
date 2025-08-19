import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1];

    console.log("Token:", token);

    if (!token) {
      return res.status(401).json({ message: "No token provided", error: true, success: false });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Access Token Secret:", process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded:", decoded);

    if (!decoded) {
      return res.status(401).json({
        message: "unauthorized access",
        error: true,
        success: false
      });
    }

    req.userId = decoded.id;
    next(); // Proceed only if token is verified
  } catch (error) {
    console.log("Auth error:", error.message);
    return res.status(401).json({ message: "You have not login", error: true, success: false });
  }
};

export default auth;









































