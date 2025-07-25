import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {

  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
     console.log("Incoming Token:", token); // DEBUG
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided, authorization denied" });
    }


    // Check if JWT_SECRET exists
    if (!process.env.APP_SOCIETY_JWT_SECRET) {
      console.error("JWT_SECRET is not set!")
      return res.status(500).json({ message: "Server configuration error" })
    }

    try {
      const decodrd = jwt.verify(token, process.env.APP_SOCIETY_JWT_SECRET , (err, decoded) => {
        if (err) {
          console.error("JWT Verification Error:", err.message); // DEBUG
          return res.status(401).json({ message: "Token is not valid" });
        }
        return decoded;
      });
      req.user = decodrd;
       console.log("Decoded Token:", req.user); // DEBUG
      console.log("Decoded Token:", req.user);
      next();
    } catch (error) {
       console.error("JWT Error:", error.message); // DEBUG
      res.status(401).json({ message: "Token is not valid" , error: error.message });
    }
  } else {
    return res
      .status(401)
      .json({ message: "Authorization header is missing or invalid" });
  }
};
export default verifyToken;
