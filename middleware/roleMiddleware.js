const authorizRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(403).json({ message: "Access denied. No user found." });
    }

    const userRole = req.user.role;
    if (!allowedRoles.includes(userRole)) {
      return res
        .status(403)
        .json({ message: "Access denied. You do not have the required role." });
    }

    next();
  };
};

export default authorizRole;
