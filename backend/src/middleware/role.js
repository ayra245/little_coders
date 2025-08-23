// role.js
const verifyRole = (allowedRoles = []) => {
    return (req, res, next) => {
      // Ensure user exists (from auth middleware)
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user found" });
      }
  
      // Check role
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied: insufficient role" });
      }
  
      next();
    };
  };
  
  module.exports = verifyRole;
  